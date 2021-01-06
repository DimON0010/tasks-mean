import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  _listId: string;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);

