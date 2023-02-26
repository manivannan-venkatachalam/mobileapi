import {inject} from '@loopback/core';
import {
  model,
  property,
  repository
} from '@loopback/repository';
import {
  getModelSchemaRef, param, patch, post, requestBody,
  Response,
  response,
  RestBindings
} from '@loopback/rest';
import {UserdetailsRepository} from '../repositories';
import {Userdetails} from './../models/userdetails.model';

//model schema for updating the notification column
@model()
class request {
  @property()
  notification: boolean;
}


export class UserdetailsController {
  constructor(
    @repository(UserdetailsRepository)
    public userdetailsRepository: UserdetailsRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) { }

  @post('/userdetails')
  @response(200, {
    description: 'Userdetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(Userdetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userdetails, {
            title: 'NewUserdetails',

          }),
        },
      },
    })
    userdetails: Userdetails,
  ): Promise<Userdetails | Object> {
    try {
      return this.userdetailsRepository.create(userdetails);
    }
    catch (err) {
      return this.response.status(500).send({status_msg: err.message});
    }
  }

  @patch('/userdetails/{id}')
  @response(204, {
    description: 'Userdetails updated successfully',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(request),
        },
      },
    })
    req: request,
  ): Promise<void | any> {
    try {
      if (id) {
        let userDetails: Userdetails[] = await this.userdetailsRepository.find({where: {userId: id}});
        if (userDetails.length > 0) {
          await this.userdetailsRepository.updateById(id, req);
          return this.response.status(204).send({status_msg: "Notification updated successfully"})
        }
      } else {
        return this.response.status(400).send({stats_msg: "id is empty"});
      }
    } catch (err) {
      return this.response.send(500).send({stats_msg: err.message});
    }
  }

}
