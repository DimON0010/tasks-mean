import { Router, Request, Response } from "express";
import { List } from "../models/list.model";
// import { HelperService } from "../services/helper.service";

const router = Router();
// const helperService = new HelperService();

router.get('/', async (req: Request, res: Response) => {
  const data = await List.find();
  res.send(data);
    // List.find({
    //     _userId: req.user_id
    // }).then((lists) => {
    //     res.send(lists);
    // })
});

router.post('/', (req: Request, res: Response) => {
    // let title = req.body.title;
    //
    // let newList = new List({
    //     title,
    //     _userId: req.user_id
    // });
    //
    // newList.save().then((listDoc) => {
    //     res.send(listDoc)
    // });
});

router.patch('/:id', (req: Request, res: Response) => {
    // List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
    //     $set: req.body
    // }).then(() => {
    //     res.send({'message': 'updated successfully'});
    // });
});

router.delete('/:id', (req: Request, res: Response) => {
    // List.findOneAndRemove({
    //     _id: req.body.id,
    //     _userId: req.user_id
    // }).then((removedListDoc) => {
    //     res.send(removedListDoc);
    //
    //     HelperService.deleteTaskFromList(removedListDoc._id);
    // })
})

export default router;
