import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Userdetails extends Entity {
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  @property()
  name: string

  @property()
  mobileNumber: string

  @property()
  userId: string

  @property()
  Address: string


  @property()
  email: string

  @property()
  notification: boolean


  [prop: string]: any;

  constructor(data?: Partial<Userdetails>) {
    super(data);
  }
}

export interface UserdetailsRelations {
  // describe navigational properties here
}

export type UserdetailsWithRelations = Userdetails & UserdetailsRelations;
