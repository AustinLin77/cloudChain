import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
/**
 * Generated class for the EnrollInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enroll-info',
  templateUrl: 'enroll-info.html',
})
export class EnrollInfoPage {
 datas=[
   {'companyName':'欣旺达电子股份有限公司','applyNum':'400','unit':'吨','time':'2018-05-15'},
   {'companyName':'欣旺达电子股份有限公司','applyNum':'400','unit':'吨','time':'2018-05-15'},
   {'companyName':'欣旺达电子股份有限公司','applyNum':'400','unit':'吨','time':'2018-05-15'},
   {'companyName':'欣旺达电子股份有限公司','applyNum':'400','unit':'吨','time':'2018-05-15'},
   {'companyName':'欣旺达电子股份有限公司','applyNum':'400','unit':'吨','time':'2018-05-15'}
  ];
 url1='/app/group/shopping/query/';
 myOrderId;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService : HttpService) {
  }
  //初始化获得数据
  ngOnInit():void{
    this.myOrderId=this.navParams.data.orderId;
    console.log(this.myOrderId);
    this.url1+=this.myOrderId;
    console.log(this.url1);
    this.httpService.getOrganize(this.url1, {}
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result){
    console.log(result);
    this.datas=result.data;
    if(result.data.length==0){
      this.httpService.presentToast("当前暂无已报名信息")
    }
  }
}
