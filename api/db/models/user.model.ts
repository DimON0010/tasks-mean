import mongoose, { Schema, Document } from 'mongoose';
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const jwtSecret = '5127465419641829756928356sgsdgfwyegfuwef326547';

export interface IUser extends Document {
  email: string;
  password: string;
  sessions: {
    token: string;
    expiresAt: number;
  }[],
  methods: Function[]
}

const UserSchema: Schema = new Schema({
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

UserSchema.methods.generateAccessAuthToken = function() {
    let user = this;
    return new Promise((resolve, reject) => {
        jwt.sign({_id: user._id.toHexString()}, jwtSecret, { expiresIn: '15m'}, (err: Error | null, token: string | undefined) => {
            if(!err) {
                resolve(token)
            } else {
                reject()
            }
        })
    });
}

UserSchema.methods.generateRefreshAuthToken = function() {
    return new Promise( (resolve) => {
        crypto.randomBytes(64, (err: Error | null, buf: Buffer) => {
            if(!err) {
                let token = buf.toString('hex');
                return resolve(token);
            }
        })
    })
}

UserSchema.methods.createSession = function() {
    let user = this;

    return this.generateAccesAuthToken().then((refreshToken: string | undefined) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken: string | undefined) => {
        return refreshToken;
    }).catch((e: Error | null) => {
        return Promise.reject('Failed to save session to database. \n' + e)
    })
}


/* HELPER METHODS */
let saveSessionToDatabase = (user: IUser, refreshToken: string | undefined) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        user.sessions.push({token: refreshToken, expiresAt});

        user.save().then(() => {
            return resolve(refreshToken);
        }).catch((e: Error | null) => {
            reject(e)
        });
    });
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpired: string = '10';
    let secondsUntilExpired = ((24 * Number(daysUntilExpired) * 60) * 60);

    return ((Date.now() / 1000) + secondsUntilExpired);
}

/* MODAL METHODS(static methods) */

UserSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}

UserSchema.statics.hasRefreshTokenExpired = (expiresAt: number) => {
    let secondsSinceEpoch = Date.now() / 1000;
    return expiresAt <= secondsSinceEpoch;
}

UserSchema.statics.findByIdAndToken = function(_id: string, token: string | undefined) {
    return this.findOne({
        _id,
        'sessions.token': token
    })
}

UserSchema.statics.findByCredentials = function(email: string, password: string) {
    return this.findOne({ email }).then((user: IUser) => {
        if(!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err: Error, res: boolean) => {
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
        bcrypt.genSalt(costFactor, (err: Error, salt: string) => {
            bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
                this.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

export default mongoose.model<IUser>('User', UserSchema);

