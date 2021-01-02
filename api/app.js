const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { List, Task, User } = require('./db/models');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// check whether the request has valid JWT token
let authenticate = (req, res, next) => {
   let token = req.headers['x-access-token'];
   jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
      if(err) {
         res.status(401).send(err);
      } else {
         req.user_id = decoded._id;
         next();
      }
   })
}

/* verify refresh token middleware */
let verifySession = (req, res, next) => {
   let refreshToken = req.header('x-refresh-token');
   let _id = req.header('_id');

   User.findByIdAndToken(_id, refreshToken).then((user) => {
      if(!user) {
         return Promise.reject({'error': 'User not found, make sure that the refresh token and id are correct'
         });
      }

      req.user_id = user._id;
      req.userObject = user;
      req.refreshToken = refreshToken;

      let isSessionValid = false;

      user.sessions.forEach((session) => {
         if(session.token === refreshToken) {
            if(User.hasRefreshTokenExpired(session.expiredAt) === false) {
               isSessionValid = true;
            }
         }
      })

      if(isSessionValid) {
         next()
      } else {
         return Promise.reject({
            'error': 'Refresh token has expired or the session is invalid.'
         })
      }

   }).catch((e) => {
      res.status(401).send(e);
   })

};
/* load middleware */
app.use(bodyParser.json());
//app.options('*', cors());
app.use('*', cors());

// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//    res.header("Access-Control-Allow-Methods", "GET,PUT,HEAD,POST,PATCH,DELETE,OPTIONS");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-refresh-token, x-access-token, _id");
//    res.header("Access-Control-Expose-Headers", "x-access-token, x-refresh-token");
//
//    next();
// });

app.get('/lists', authenticate, (req, res) => {
   List.find({
      _userId: req.user_id
   }).then((lists) => {
      res.send(lists);
   })
});

app.post('/lists', authenticate, (req, res) => {
   let title = req.body.title;

   let newList = new List({
      title,
      _userId: req.user_id
   });

   newList.save().then((listDoc) => {
      res.send(listDoc)
   });
});

app.patch('/lists/:id', authenticate, (req, res) => {
   List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
      $set: req.body
   }).then(() => {
      res.send({'message': 'updated successfully'});
   });
});

app.delete('/lists/:id', authenticate, (req, res) => {
   List.findOneAndRemove({
      _id: req.body.id,
      _userId: req.user_id
   }).then((removedListDoc) => {
      res.send(removedListDoc);

      deleteTaskFromList(removedListDoc._id);
   })
})

app.get('/lists:listId/tasks', authenticate, (req, res) => {
   Task.find({
      _listId: req.params.listId
   }).then((tasks) => {
      res.send(tasks)
   })
})

app.post('/lists:listId/tasks', authenticate, (req, res) => {

   List.findOne({
      _id: req.params.listId,
      _userId: req.user_id
   }).then((list) => {
      return !!list
   }).then((canCreateTask) => {
      if(canCreateTask) {
         let newTask = new Task({
            title: req.body.title,
            _listId: req.params.listId
         });
         newTask.save().then((newTaskDoc) => {
            res.send(newTaskDoc);
         });
      } else {
         res.sendStatus(404);
      }
   })
});

app.patch('/lists:listId/tasks:taskId', authenticate, (req, res) => {

   List.findOne({
      _id: req.params.listId,
      _userId: req.user_id
   }).then((list) => {
      return !!list;
   }).then((canUpdateTask) => {
      if(canUpdateTask) {
         Task.findOneAndUpdate({
            _id: req.params.id,
            _listId: req.params.listId
         }, {
            $set: req.body
         }).then(() => {
            res.send({message: 'Update successfully.'})
         })
      } else {
            res.sendStatus(404);
      }
   })


})

app.delete('/lists:listId/tasks:taskId', authenticate,(req, res) => {

   List.findOne({
      _id: req.params.listId,
      _userId: req.user_id
   }).then((list) => {
      return !!list;
   }).then((canDeleteTask) => {
      if (canDeleteTask) {
         Task.findOneAndRemove({
            _id: req.params.id,
            _listId: req.params.listId
         }).then((removedTaskDoc) => {
            res.send(removedTaskDoc)
         })
      } else {
         res.sendStatus(404);
      }
   })
   
})

/* users API */

app.post('users', (req, res) => {
   let newUser = new User(req.body);

   newUser.save().then(() => {
      return newUser.createSession();
   }).then((refreshToken) => {
         return newUser.generateAccesAuthToken().then((accessToken) => {
            return {accessToken, refreshToken}
         })
       }).then((authTokens) => {
          res
              .header('x-refresh-token', authTokens.refreshToken)
              .header('x-access-token', authTokens.accessToken)
              .send(newUser);
   }).catch((e) => {
      res.status(400).send(e);
   })
})

app.post('users/login', (req, res) => {
   let { email, password } = req.body;

   User.findByCredentials(email, password).then((user) => {
      return user.createSession().then((refreshToken) => {
         return user.generateAccesAuthToken().then((accessToken) => {
            return { accessToken, refreshToken }
         });
      }).then((authTokens) => {
         res
             .header('x-refresh-token', authTokens.refreshToken)
             .header('x-access-token', authTokens.accessToken)
             .send(user);
      })
   }).catch((e) => {
      res.status(400).send(e);
   })
})

app.get('/users/me/access-token', verifySession, (req, res) => {
   req.userObject.generateAccesAuthToken().then((accessToken) => {
      res.header('x-access-token', accessToken).send({ accessToken });
   }).catch((e) => {
      res.status(400).send(e);
   });
})

/* HELPER METHODS */

let deleteTaskFromList = (_listId) => {
   Task.deleteMany({
      _listId
   })
}

app.use(function(req, res, next) {
   res.status(404).send('Sorry cant find that!');
});

app.listen(3000, () => {
   console.log('App is listened on port 3000! ')
});


