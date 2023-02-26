import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Mobiledetails extends Entity {

  @property({
    id: true,
    generate: true,
  })
  mobileid: number;

  @property()
  name: string

  @property()
  color: string


  @property()
  price: number

  @property()
  model: string

  @property()
  Brand_name: string

  @property()
  network_type: string

  @property()
  rating: number

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Mobiledetails>) {
    super(data);
  }
}

export interface MobiledetailsRelations {
  // describe navigational properties here
}

export type MobiledetailsWithRelations = Mobiledetails & MobiledetailsRelations;
