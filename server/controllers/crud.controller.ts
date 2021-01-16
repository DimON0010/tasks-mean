import { Document, FilterQuery, Model } from 'mongoose';
import { ParsedQs } from 'qs';
import { Request } from "express";

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

  public async read(query?: FilterQuery<I>, id: string | ParsedQs | string[] | ParsedQs[] = null): Promise<I> {
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
    // TODO: remove any
    return result as any;
  }

  public async update(id: string | ParsedQs | string[] | ParsedQs[], data: Request["body"]): Promise<I> {
    try {
      const result = await this._entity.findByIdAndUpdate(id, {...data});

      return result;
    } catch (e) {
      throw new Error(`Update is failed: ${e}`);;
    }
  }

  public async delete(id: string | ParsedQs | string[] | ParsedQs[] = null): Promise<boolean> {
    try {
      const result = await this._entity.findByIdAndDelete(id);
      // TODO: remove any
      return result as any;
    } catch (e) {
      throw new Error(`Delete is failed: ${e}`);
    }
  }
}
