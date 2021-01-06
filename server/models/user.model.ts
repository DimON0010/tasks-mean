import mongoose, { Schema, Document } from 'mongoose';
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const jwtSecret = '5127465419641829756928356sgsdgfwyegfuwef326547';

export interface IUser extends Document {
  id?: string;
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

export const User = mongoose.model<IUser>('User', UserSchema);

