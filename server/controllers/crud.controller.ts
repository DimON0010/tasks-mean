import { Document, FilterQuery, Model } from 'mongoose';


export abstract class CrudController<I extends Document,T extends Model<I>> {

  protected constructor(
    private _entity: T
  ) { }

  public async create(data: I): Promise<I>{
    try {
      const result = await this._entity.create(data);
      return result;
    } catch(e) {
      console.log(e);
    }
  }

  public async read(query?: FilterQuery<I>, id: string = null): Promise<I> {
    let result;

    try {
      if (id) {
        result = await this._entity.findById(id);
      } else {
        result = await this._entity.find(query);
      }

      console.log(result);
    } catch (e) {
      console.log(e);
    }
    return await result;
  }

  public async update(id: string, data: I): Promise<I> {
    // try {
    //   const result = await this._entity.findByIdAndUpdate(id, { ...data });
    //
    //   return result;
    // } catch (e) {
    //   console.log(e);
    // }
    throw new Error('Not Implemented');
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this._entity.deleteOne(id);

      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
