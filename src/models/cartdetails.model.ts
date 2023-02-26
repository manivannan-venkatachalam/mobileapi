import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Cartdetails extends Entity {

  @property({
    type: 'number',
    id: true,
  })
  id: number

  @property()
  ItemId: string;

  @property()
  ItemName: string;

  @property()
  userId: string;

  @property()
  createDate: Date;

  @property()
  Isactive: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cartdetails>) {
    super(data);
  }
}

export interface CartdetailsRelations {
  // describe navigational properties here
}

export type CartdetailsWithRelations = Cartdetails & CartdetailsRelations;
