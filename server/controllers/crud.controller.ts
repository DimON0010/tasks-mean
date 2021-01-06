import { Model } from 'mongoose';
import { Request, Response } from "express";

export abstract class CrudController<T extends Model<any>> {

  protected constructor(
    private _entity: any & T
  ) { }

  public async create(req: Request, res: Response): Promise<T>{
    const result = await this._entity.create();

    return result;
  }

  public async read(req: Request, res: Response): Promise<T> {
    return null as any;
  }

  public async update(id: number, data: T): Promise<T> {
    return null as any;
  }

  public async delete(id: number): Promise<boolean> {
    return null as any;
  }
}
