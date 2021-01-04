const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


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

app.use("/", routes);

app.use(function(req, res, next) {
   res.status(404).send('Sorry cant find that!');
});

app.listen(3000, () => {
   console.log('App is listened on port 3000! ')
});


