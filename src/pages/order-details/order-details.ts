import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { ProductionPage} from '../production/production';
import { HttpService } from '../../service/HttpService';
import {TabsPage} from '../tabs/tabs'
/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
  allData =[];
  url='/app/order/detail';
  orderId;
  myUnit:'';
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService,public alertCtrl: AlertController) {
  }

  //删除订单
  // deleteNum(){
  //   for(var i=0;i<this.allData.length;i++){
  //     for(var j=0;j<this.allData[i].content.length;j++) {
  //       if(this.allData[i].content[j].isChecked){
  //         this.delOrderId=this.allData[i].content[j].orgId;
  //         this.thOrderId=this.allData[i].content[j].thOrderId;
  //       }
  //     }
  //   }
  //   this.delUrl+=this.delOrderId;
  //   this.delUrl+='/';
  //   this.delUrl+=this.thOrderId;
  //   this.httpService.deleteId(this.delUrl, { }
  //   ).then(
  //     res => this.handleDelSuccess(res));
  // }
  // handleDelSuccess(result){
  //    console.log(result);
  //   if(result.message=="操作成功"){
  //     this.statusMessage='删除订单成功';
  //     this.fShowConfirm('订单删除状态', this.statusMessage, '确定');
  //   }else{
  //     this.statusMessage='删除订单失败';
  //     this.fShowConfirm('订单删除状态', this.statusMessage, '返回');
  //   }
  // }
  // //弹窗
  // fShowConfirm(title, message, okText) {
  //   let confirm = this.alertCtrl.create({
  //     title: title,
  //     message: message,
  //     buttons: [
  //       {
  //         text: okText,
  //         handler: () => {
  //          this.navCtrl.setRoot(TabsPage,{'myindex':1});
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  //继续购买
  buyAgain(){
    this.navCtrl.push('ProductionPage',{whatSend:0});
  }
  //获得订单详情
  ngOnInit():void {
    this.orderId=this.navParams.data.orderId;
    this.httpService.getOrganize(this.url, { 'ids':this.orderId}
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result){
    console.log(result);
    for(var i=0;i<result.data.length;i++){
      result.data[i].total=0;
      for(var j=0;j<result.data[i].content.length;j++) {
        result.data[i].content[j].isChecked=0;
        result.data[i].total = Number((result.data[i].total + parseFloat(result.data[i].content[j].price) * result.data[i].content[j].qty).toFixed(2))
        result.data[i].content[j].imgPathList = result.data[i].content[j].imgPathList[0];
        if (!result.data[i].content[j].currency) {
          result.data[i].content[j].currency = '￥';
        }
        switch (result.data[i].content[j].currency) {
          case 'CNY':
            result.data[i].content[j].currency = '￥';
            break;
          case 'USD':
            result.data[i].content[j].currency = '$';
            break;
        }this.myUnit= result.data[0].content[0].currency;
      }
    } this.allData=result.data;
  }
}
