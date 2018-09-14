import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService} from '../../../service/HttpService';
/**
 * Generated class for the QuotationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotation-details',
  templateUrl: 'quotation-details.html',
})
export class QuotationDetailsPage {
 data={};
 id;
 url='/app/quotation/detail/';
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
  }
  //初始化获得数据
  ngOnInit():void{
    this.id=this.navParams.data.id;
    this.url+=this.id;
    this.httpService.getOrganize(this.url, {}
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result){
    console.log(result);
    this.data=result.data
  }
}
