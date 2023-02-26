import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDbConnectorDataSource} from '../datasources';
import {Userdetails, UserdetailsRelations} from '../models';

export class UserdetailsRepository extends DefaultCrudRepository<
  Userdetails,
  typeof Userdetails.prototype.userId,
  UserdetailsRelations
> {
  constructor(
    @inject('datasources.mysql_db_connector') dataSource: MysqlDbConnectorDataSource,
  ) {
    super(Userdetails, dataSource);
  }
}
