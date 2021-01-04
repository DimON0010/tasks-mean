import { Router, Request, Responce } from "express";
import { HelperService } from "../services/helper.service";

const router = Router();

router.get('/', HelperService.authenticate, (req: Request, res: Responce) => {
    List.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    })
});

router.post('/', HelperService.authenticate, (req: Request, res: Responce) => {
    let title = req.body.title;

    let newList = new List({
        title,
        _userId: req.user_id
    });

    newList.save().then((listDoc) => {
        res.send(listDoc)
    });
});

router.patch('/:id', HelperService.authenticate, (req: Request, res: Responce) => {
    List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then(() => {
        res.send({'message': 'updated successfully'});
    });
});

router.delete('/:id', HelperService.authenticate, (req: Request, res: Responce) => {
    List.findOneAndRemove({
        _id: req.body.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);

        HelperService.deleteTaskFromList(removedListDoc._id);
    })
})

export default router;