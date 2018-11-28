import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {PurchasePage} from '../purchase/purchase';
import {PurchaseDetailsPage} from "../purchase-details/purchase-details";

/**
 * Generated class for the SubmitStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit-status',
  templateUrl: 'purchase-status.html',
})
export class PurchaseStatusPage {
  status:string;
  logoUrl:string;
  statusNote:string;
  message:string;
  orderId;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ownerBack(){
    this.navCtrl.push('PurchasePage')
  }
  ngOnInit() {
    //取得提交状态信息和订单id
    this.message=this.navParams.data.mes;
    if(this.message=='操作成功'){
      this.status='提交成功';
      this.logoUrl='assets/imgs/ic_success.png';
      this.statusNote='集采报名成功！请等待2-3个工作日，若可成团，即可进行接下来的交易。';
    }else{
      this.status='提交失败';
      this.logoUrl='assets/imgs/wrong.jpg';
      this.statusNote='集采报名失败，请检查提交信息';
    }
  }
  //跳转到集采列表
  goToPurchase(){
    this.navCtrl.push('PurchasePage');
  }
  //跳转到集采详情页面
  goToPurchaseDetails(){
     localStorage.setItem('myFlag','aaa');
     console.log(localStorage.getItem('myFlag'));
     this.navCtrl.push('PurchaseDetailsPage');
  }
}


