import mongoose, { Schema, Document } from 'mongoose';


export interface IList extends Document {
  title: string;
  _userId?: string;
  _id?: string;
}

const ListSchema: Schema = new Schema({
   title: {
       type: String,
       required: true,
       minlength: 1,
       maxlength: 64,
       trim: true
   },
    _userId: {
       type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
})

export const List = mongoose.model<IList>('List', ListSchema);
