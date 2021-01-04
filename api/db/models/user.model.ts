const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const jwtSecret = '5127465419641829756928356sgsdgfwyegfuwef326547';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    return _.omit(userObject, ['password', 'sessions']);
}

UserSchema.methods.generateAccesAuthToken = function() {
    return new Promise((resolve, reject) => {
        jwt.sign({_id: user._id.toHexString()}, jwtSecret, { expiresIn: '15m'}, (err, token) => {
            if(!err) {
                resolve(token)
            } else {
                reject()
            }
        })
    });
}

UserSchema.methods.generateRefreshAuthToken = function() {
    return new Promise( (resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if(!err) {
                let token = buf.toString('hex');
                return resolve(token);
            }
        })
    })
}

UserSchema.methods.createSession = function() {
    return this.generateAccesAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(this, refreshToken);
    }).then((refreshToken) => {
        return refreshToken;
    }).catch((e) => {
        return Promise.reject('Failed to save session to database. \n' + e)
    })
}


/* HELPER METHODS */
let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        user.sessions.push({token: refreshToken, expiresAt});

        user.save().then(() => {
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e)
        });
    });
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpired = '10';
    let secondsUntilExpired = ((daysUntilExpired * 24) * 60) * 60;

    return ((Date.now() / 1000) + secondsUntilExpired);
}

/* MODAL METHODS(static methods) */

UserSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    expiresAt > secondsSinceEpoch ? false : true;
}

UserSchema.statics.findByIdAndToken = function(_id, token) {
    return this.findOne({
        _id,
        'sessions.token': token
    })
}

UserSchema.statics.findByCredentials = function(email, password) {
    return this.findOne({ email }).then((user) => {
        if(!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) resolve(user);
                else {
                    reject();
                }
            })
        })
    })
}


/* MIDDLEWARE */
UserSchema.pre('save', function(next) {
    let costFactor = 10;
    if (this.isModified('password')) {
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User }