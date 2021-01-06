import { Router, Request, Response } from "express";
import { Task, List } from "../models";
import { HelperService } from "../services/helper.service";
import {ITask} from "../models/task.model";

const router = Router();

router.get('/', HelperService.authenticate, (req: Request, res: Response) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks: ITask[]) => {
        res.send(tasks)
    })
})

router.post('/', HelperService.authenticate, (req: Request, res: Response) => {

    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        return !!list
    }).then((canCreateTask) => {
        if(canCreateTask) {
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            });
            newTask.save().then((newTaskDoc) => {
                res.send(newTaskDoc);
            });
        } else {
            res.sendStatus(404);
        }
    })
});

router.patch('/:taskId', HelperService.authenticate, (req: Request, res: Response) => {

    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        return !!list;
    }).then((canUpdateTask) => {
        if(canUpdateTask) {
            Task.findOneAndUpdate({
                _id: req.params.id,
                _listId: req.params.listId
            }, {
                $set: req.body
            }).then(() => {
                res.send({message: 'Update successfully.'})
            })
        } else {
            res.sendStatus(404);
        }
    })


})

router.delete('/:taskId', HelperService.authenticate, (req: Request, res: Response) => {

    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        return !!list;
    }).then((canDeleteTask) => {
        if (canDeleteTask) {
            Task.findOneAndRemove({
                _id: req.params.id,
                _listId: req.params.listId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc)
            })
        } else {
            res.sendStatus(404);
        }
    })

})

export default router;
