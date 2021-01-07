import { FilterQuery, Model } from 'mongoose';


export abstract class CrudController<T extends Model<any>> {

  protected constructor(
    private _entity: T
  ) { }

  public async create(data: T): Promise<T>{
    try {
      const result = await this._entity.create(data);
      return result;
    } catch(e) {
      console.log(e);
    }
  }

  public async read(data?: FilterQuery<T>, id: string = null): Promise<T> {
    let result;

    try {
      if (id) {
        result = await this._entity.findById(id);
      } else {
        result = await this._entity.find(data);
      }

      console.log(result);
    } catch (e) {
      console.log(e);
    }
    return await result;
  }

  public async update(id: string, data: T): Promise<T> {
    try {
      const result = await this._entity.updateOne({ id }, { ...data });

      return result;
    } catch (e) {
      console.log(e);
    }
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
