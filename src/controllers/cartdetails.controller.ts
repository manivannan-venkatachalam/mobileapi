import {
  repository
} from '@loopback/repository';
import {get} from '@loopback/rest';
import {CartdetailsRepository} from '../repositories';
var moment = require('moment');


export class CartdetailsController {
  constructor(
    @repository(CartdetailsRepository)
    public cartdetailsRepository: CartdetailsRepository,
  ) { }

  @get('/updatecart')
  public async cartdetailsupdate(): Promise<string> {
    let activeDetails = await this.cartdetailsRepository.find({where: {Isactive: true}});
    for (let i of activeDetails) {
      var d1 = new Date(i.createDate).getTime()
      var d2 = new Date().getTime();
      var diff: any = ((d1 - d2) / (1000 * 60)).toFixed(1);
      if (diff >= 30) {
        await this.cartdetailsRepository.updateById(i.id, {Isactive: false})
      }

    }
    return "updated successfully";
  }

}
