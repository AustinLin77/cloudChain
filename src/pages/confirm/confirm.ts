import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubmitStatusPage} from '../submit-status/submit-status';
import { HttpService } from '../../service/HttpService';
/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  myDate:string;
  companyName:string;
  url:string;
  name:string;
  unit:string;
  currency:string;
  price:number;
  message:string;
  id:string;
  organize:string;
  selectOptions={};
  orderId;
  organization ;
  amount=0;
  total=0;
  url1='/app/order/add';
  flag=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {}
  //初始化获得路由携带的数据
  ionViewDidEnter(){
    this.companyName = this.navParams.data.companyName;
    this.url = this.navParams.data.url;
    this.name = this.navParams.data.name;
    this.price = this.navParams.data.price;
    this.unit = this.navParams.data.unit;
    this.currency = this.navParams.data.currency;
    this.id = this.navParams.data.id;
    console.log(this.url)
  }
   //数量加
  add(){
    this.amount++;
    this.total=this.amount*this.price;
  }
   //数量减
  minus(){
   if(this.amount<=0){
     this.amount=0;
   }else{
   this.amount--;
   }
   this.total=this.amount*this.price;
  }
   //总计
  countTotal(){
   if(this.amount<=0){
     this.amount=0;
     this.total = this.amount * this.price;
   }else {
     this.total = this.amount * this.price;
   }
  }
  //确认提交
  confirm(){
   //判断必选条件是否已选
   if(this.amount==0){
     this.httpService.presentToast("请选择需求数量");
     return
   }else if(this.myDate==null){
     this.httpService.presentToast("请选择需求日期");
     return
   }else if(this.organize==null){
     this.httpService.presentToast("请选择库存组织");
     return
   }
   this.flag=true;
   //封装数据
   var data={
       "carList": [{
       "itemId":this.id,
       "purchaseNow": 'true',
       "quantity": this.amount,
       "requiredDate": this.myDate,
       "select": true,
       "sellerName": this.companyName
       }],
     "orgId": this.organize
   };
   //提交
   this.httpService.newPostBody(this.url1,data).then(res => this.handleNewSuccess(res));
 }
  handleNewSuccess(result){
    console.log(result);
    this.message=result.message;
    this.orderId=result.data;
    console.log(this.orderId);
    this.navCtrl.push('SubmitStatusPage',{'mes':this.message,'orderId':this.orderId});
  }
  //获得库存组织
  ngOnInit():void {
    this.httpService.getOrganize('/app/get/current/user/org', {})
      .then(res => this.handleUserInfoSuccess(res));
  }
  handleUserInfoSuccess(result){
    this.organization=result.data;
    console.log(this.organization);
    this.selectOptions= {
      title: '选择库存组织',
      mode: 'md'
    };
  }
}
