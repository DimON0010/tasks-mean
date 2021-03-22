
// import { Task, List } from './index';
import * as Joi from "joi";
import { Task } from "./task.model";
import { User } from "./user.model";
import { List } from "./list.model";


export const taskGetValidator: Joi.ObjectSchema<typeof Task> = Joi.object().keys({
  taskId: Joi.string().min(1).max(128).required()
});

export const userPostLoginValidator: Joi.ObjectSchema<typeof User> = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
})

export const userPostValidator: Joi.ObjectSchema<typeof User> = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
      firstName: Joi.string().min(1).max(32).required(),
      lastName: Joi.string().min(1).max(32).required()
})


export const userGetQueryValidator: Joi.ObjectSchema<typeof User> = Joi.object().keys({
  email: Joi.string().email(),
  firstName: Joi.string().min(1).max(32),
  lastName: Joi.string().min(1).max(32)
});

export const listGetParamValidator: Joi.ObjectSchema<typeof List> = Joi.object().keys({
  _listId: Joi.string().length(24).required()
});

export const listGetTasksQueryValidator: Joi.ObjectSchema<typeof List> = Joi.object().keys({
  withTasks: Joi.string().equal('true', 'false')
});

export const taskPatchBodyValidator: Joi.ObjectSchema<typeof Task> = Joi.object().keys({
  title: Joi.string().min(1).max(64),
  completed: Joi.boolean()
});

export const taskPatchParamsValidator: Joi.ObjectSchema<typeof Task> = Joi.object({
  taskId: Joi.string().length(24).required()
});

export const taskPostBodyValidator: Joi.ObjectSchema<typeof Task> = Joi.object({
  title: Joi.string().min(1).max(64).required(),
  _listId: Joi.string().length(24).required(),
  completed: Joi.boolean().required()
});

export const taskDeleteParamsValidator: Joi.ObjectSchema<typeof Task> = Joi.object({
  taskId: Joi.string().length(24).required()
});

export const joiSchemas = {
  Task: {
    taskParams: Joi.object().keys({
      taskId: Joi.string().length(24).required()
    }),
    taskBody: Joi.object().keys({
      title: Joi.string().min(1).max(64).required(),
      _listId: Joi.string().length(24).required(),
      completed: Joi.boolean().required()
    }),
    taskPatchBody: Joi.object().keys({
      title: Joi.string().min(1).max(64).required()
    }),
    taskQuery: Joi.object().keys({
      _listId: Joi.string().length(24),
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
      _userId: Joi.string().length(24),
    }),
    listPatchBody: Joi.object().keys({
      title: Joi.string().min(1).max(64).required()
    }),
    listQuery: Joi.object().keys({
      title: Joi.string().min(1).max(64)
    })
  },
  User: {
    userParams: Joi.object().keys({
      userId: Joi.string().min(1).max(128).required()
    }),
    userRegBody: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
      firstName: Joi.string().min(1).max(32).required(),
      lastName: Joi.string().min(1).max(32).required()
    }),
    userLogBody: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
    }),
    userPatchBody: Joi.object().keys({
      firstName: Joi.string().min(1).max(32),
      lastName: Joi.string().min(1).max(32)
    }),
    userQuery: Joi.object().keys({
      firstName: Joi.string().min(1).max(32),
      lastName: Joi.string().min(1).max(32)
    })
  }
}
