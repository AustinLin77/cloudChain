import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ProductionPage} from '../production/production';
import { OrderDetailsPage} from '../order-details/order-details';

/**
 * Generated class for the SubmitStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit-status',
  templateUrl: 'submit-status.html',
})
export class SubmitStatusPage {
  status:string;
  logoUrl:string;
  statusNote:string;
  message:string;
  orderId;
  chain;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  //初始化获得用户手机平台
  ionViewDidLoad() {
    this.chain=localStorage.getItem('chain');
    console.log(this.chain)
  }
  ownerBack(){
    this.navCtrl.push('ProductionPage',{whatSend:0})
  }
  //初始化获得数据
  ngOnInit() {
    //取得提交状态信息和订单id
    this.message=this.navParams.data.mes;
    this.orderId=this.navParams.data.orderId;
    console.log(this.orderId);
    if(this.message=='操作成功'){
      this.status='提交成功';
      this.logoUrl='assets/imgs/ic_success.png';

      this.statusNote='已申请成功，请等待审批';
    }else{
      this.status='提交失败';
      this.logoUrl='assets/imgs/wrong.jpg';
      this.statusNote='提交失败，请检查提交信息';
    }
  }
  //携带参数跳转到产品列表
  goToProductions(){
    this.navCtrl.push('ProductionPage',{whatSend:0});
  }
  //携带参数跳转到订单详情
  goToOrderDetails(){
    this.navCtrl.push('OrderDetailsPage',{'orderId':this.orderId});
  }
}


