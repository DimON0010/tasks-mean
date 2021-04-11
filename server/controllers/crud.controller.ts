import { Document, FilterQuery, Model } from 'mongoose';
import { ParsedQs } from 'qs';
import { Request } from 'express';
import { ITask } from '../models/task.model';


export abstract class CrudController<I extends Document, T extends Model<I>> {

  protected constructor(
    private _entity: T
  ) {
  }

  public async create(data: I): Promise<I> {
    try {
      const result = await this._entity.create(data);
      return result;
    } catch (e) {
      throw new Error(`Create method is failed: ${e}`);
    }
  }

  public async read(query?: FilterQuery<I>, id: string | ParsedQs | string[] | ParsedQs[] = null): Promise<I | I[]> {
    let result;
    try {
      if (id) {
        result = await this._entity.findById(id);
      } else {
        result = await this._entity.find(query);
      }

    } catch (e) {
      throw new Error(`Read method is failed: ${e}`);
    }

    return result;
  }

  public async update(id: string | ParsedQs | string[] | ParsedQs[], data: Request["body"]): Promise<I> {
    let result;
    try {
      result = await this._entity.findByIdAndUpdate({_id: id }, {...data}, {}, function(err, result) {
        if (err) {
          console.error(err);
        }
      })

      return result;
    } catch (e) {
      throw new Error(`Update is failed: ${e}`);
    }
  }

  public async delete(id: string | ParsedQs | string[] | ParsedQs[] = null): Promise<I | boolean> {
    try {
      const result = await this._entity.findByIdAndDelete(id);

      return result;
    } catch (e) {
      throw new Error(`Delete is failed: ${e}`);
    }
  }
}
