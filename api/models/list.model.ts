import mongoose, { Schema, Document } from 'mongoose';


export interface IList extends Document {
  title: string;
  // _userId: string;
}

const ListSchema: Schema = new Schema({
   title: {
       type: String,
       required: true,
       minlength: 1,
       trim: true
   },
    // _userId: {
    //    type: mongoose.Types.ObjectId,
    //     required: true
    // }
});

export const List = mongoose.model<IList>('List', ListSchema);
