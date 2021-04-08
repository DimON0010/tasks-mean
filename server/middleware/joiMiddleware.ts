import * as Joi from 'joi';
import { Request, Response, NextFunction} from "express";


export const joiMiddleware = (schema: Joi.Schema, property: 'query' | 'params' | 'body') => {

  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) { next() }
    else {
      const { details } = error;
      const message = details.map((i: any ) => i.message).join(', ');
      
      res.status(422).json({error: message});
    }
  }
}

