const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
// import { Task, List } from './index';

export const joiSchemas = {
  Task: {
    taskParams: Joi.object().keys({
      taskId: Joi.string().min(1).max(128).required()
    }),
    taskBody: Joi.object().keys({
      title: Joi.string().min(1).max(64).required(),
      _listId: Joi.objectId().required(),
      completed: Joi.boolean().required()
    }),
    taskPatchBody: Joi.object().keys({
      title: Joi.string().min(1).max(64).required()
    }),
    taskQuery: Joi.object().keys({
      title: Joi.string().min(1).max(64),
      completed: Joi.boolean()
    })
  },
  List: {
    listParams: Joi.object().keys({
      listId: Joi.string().min(1).max(128).required()
    }),
    listBody: Joi.object().keys({
      title: Joi.string().min(1).max(64).required(),
      _userId: Joi.objectId(),
    }),
    listPatchBody: Joi.object().keys({
      title: Joi.string().min(1).max(64).required()
    }),
    listQuery: Joi.object().keys({
      title: Joi.string().min(1).max(64)
    })
  }
}
