import {Model, Query} from 'mongoose';
import {RequestHandler} from "express";

export abstract class CrudController< T extends Model<any> > {

  protected constructor(
    private _entity: any & T
  ) { }

  public async create(data: T): Promise<T>{
    try {
      const result = await this._entity.create();

      return await result;

    } catch(e) {
      console.log(e);
    }
  }

  public read = async (
    //data: Query<any, any, any>, id?: string
     ): Promise<T> => {
    try {
      let result;
      // id ? result = await this._entity.findById(id):
      result = await this._entity.find();
      console.log(result);
        // .then((data: any): any => {
        // console.log(data);
        // result = data;
        // return data
     // })
    return await result;

    } catch (e) {
      console.log(e);
    }
  }

  public async update(id: number, data: T): Promise<T> {
    try {
      const result = await this._entity.updateOne({ id }, { ...data });

      return result;

    } catch (e) {
      console.log(e);
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const result = await this._entity.deleteOne(id);

      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
