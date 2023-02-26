
import {inject} from '@loopback/core';
import {
  Filter, model, property, repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, post, requestBody,
  Response,
  response,
  RestBindings
} from '@loopback/rest';
import {Mobiledetails} from '../models';
import {MobiledetailsRepository, UserdetailsRepository} from '../repositories';
import {Mail} from '../resusable/sendMail';

@model()
class request {
  @property()
  price: number
}

export class AddmobiledetailsController {
  constructor(
    @repository(MobiledetailsRepository)
    public mobiledetailsRepository: MobiledetailsRepository,
    @repository(UserdetailsRepository) private users: UserdetailsRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) { }

  @post('/mobiledetails')
  @response(200, {
    description: 'Mobiledetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mobiledetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mobiledetails, {
            title: 'NewMobiledetails',
            exclude: ['id'],
          }),
        },
      },
    })
    mobiledetails: Omit<Mobiledetails, 'id'>,
  ): Promise<Mobiledetails | Object> {
    try {

      let addeddetails = await this.mobiledetailsRepository.create(mobiledetails);
      let userDetails = await this.users.find({where: {notification: true}, fields: {email: true}})
      if (userDetails.length > 0 && addeddetails.mobileid) {
        for (let i of userDetails) {
          let message = {
            from: "manibobo997@gmail.com",
            to: i.email,
            subject: "New Mobile",
            html: `<h1>Model :${addeddetails.model}</h1>
                  <h1> Brand :${addeddetails.Brand_name}</h1>
                  <h1> price : ${addeddetails.Price}</h1>
                  <h1>color :${addeddetails.Color}</h1>`
          }
          await Mail(message);
        };
      }
      return this.response.send(200).send({status_msg: "Product added"});

    }
    catch (e) {
      return this.response.status(500).send({status_msg: e.message});
    }
  }



  @get('/mobiledetails')
  @response(200, {
    description: 'Array of Mobiledetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mobiledetails, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mobiledetails) filter?: Filter<Mobiledetails>,
  ): Promise<Mobiledetails[] | Object> {
    try {
      return this.mobiledetailsRepository.find(filter);
    } catch (e) {
      return this.response.status(500).send({status_msg: e.message})
    }
  }





  @post('/mobiledetailsbyprice')
  @response(200, {
    description: 'Mobiledetails',
    content: {'application/json': {schema: getModelSchemaRef(request)}},
  })
  async findByPrice(
    @requestBody() req: request,
  ): Promise<Mobiledetails[] | Object> {
    try {
      if (req.price) {
        return await this.mobiledetailsRepository.find({where: {price: req.price}});
      } else {
        return this.response.status(400).send({status_message: "Price details is empty"});
      }
    }
    catch (e) {
      return this.response.status(500).send({status_message: e.message});
    }
  }


}
