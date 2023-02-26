import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDbConnectorDataSource} from '../datasources';
import {Cartdetails, CartdetailsRelations} from '../models';

export class CartdetailsRepository extends DefaultCrudRepository<
  Cartdetails,
  typeof Cartdetails.prototype.id,
  CartdetailsRelations
> {
  constructor(
    @inject('datasources.mysql_db_connector') dataSource: MysqlDbConnectorDataSource,
  ) {
    super(Cartdetails, dataSource);
  }
}
