import { CrudController } from "./crud.controller";
import { List } from "./../models";

export class ListController extends CrudController< typeof List> {
  constructor() {
    super(List);
  }

 //  public async read(req: Request, res: Response) {
 //    const data = await List.find();
 //    res.send(data);
 //    // List.find({
 //    //     _userId: req.user_id
 //    // }).then((lists) => {
 //    //     res.send(lists);
 //    // })
 //  }
 //
 //  public async create(req: Request, res: Response) {
 //     let title = req.body.title;
 //
 //     let newList = new List({
 //         title,
 //    //     _userId: req.user_id
 //     });
 //
 //     await newList.save().
 //            then((listDoc) => {
 //              res.send(listDoc)
 //            });
 //  }
 //
 //  public async update(req: Request, res: Response) {
 //   List.findOneAndUpdate({ _id: req.params.id
 //   //  _userId: req.user_id
 //   }, {
 //      $set: req.body
 //   }).then(() => {
 //       res.send({'message': 'updated successfully'});
 //   });
 // }
 //
 // public async delete(req: Request, res: Response) {
 //   List.findOneAndRemove({
 //       _id: req.body.id,
 //  //     _userId: req.user_id
 //   }).then((removedListDoc: typeof List) => {
 //       res.send(removedListDoc);
 //
 //       this.helperService.deleteTaskFromList(removedListDoc._id);
 //   })
// }

}
