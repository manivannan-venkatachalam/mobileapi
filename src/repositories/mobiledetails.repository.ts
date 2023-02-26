import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDbConnectorDataSource} from '../datasources';
import {Mobiledetails, MobiledetailsRelations} from '../models';

export class MobiledetailsRepository extends DefaultCrudRepository<
  Mobiledetails,
  typeof Mobiledetails.prototype.id,
  MobiledetailsRelations
> {
  constructor(
    @inject('datasources.mysql_db_connector') dataSource: MysqlDbConnectorDataSource,
  ) {
    super(Mobiledetails, dataSource);
  }
}
