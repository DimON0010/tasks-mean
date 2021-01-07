import mongoose, { Schema, Document } from 'mongoose';


export interface IUser extends Document {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 32,
    },
})

export const User = mongoose.model<IUser>('User', UserSchema);
