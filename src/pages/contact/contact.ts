import { Component } from '@angular/core';
import { NavController, App,NavParams  } from 'ionic-angular';
import { MyPurchasePage} from "./my-purchase/my-purchase"
import { HttpService} from '../../service/HttpService';
import { LoginPage} from '../../pages/login/login'
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  showWhat:number;
  data=[];

  constructor(public navCtrl: NavController, private app: App,private httpService:HttpService,public navParams: NavParams,) {
  }
  ionViewWillEnter(){
    this.httpService.getOrganizea('/app/get/company', {}
       ).then(
          res => this.handleSuccess(res));


  }

//点击我的订单
  myShopList(){
    if(this.showWhat==1) {
      this.app.getRootNav().push('MyShopListPage')
    }else if(this.showWhat==0){
      this.httpService.presentToast("请登录/注册后再操作")
    }
  }
  //点击设置
  set(){
    this.app.getRootNav().push('SetPage')
  }
  //点击我的报价
  myPurchase(){
    if(this.showWhat==1) {
      this.app.getRootNav().push('MyPurchasePage');
      localStorage.setItem('whatFlag', '0')
    }else if(this.showWhat==0){
      this.httpService.presentToast("请登录/注册后再操作")
    }
  }
  //点击我收到的报价
  myRecPurchase(){
    if(this.showWhat==1) {
      this.app.getRootNav().push('MyPurchasePage');
      localStorage.setItem('whatFlag', '1')
    }else if(this.showWhat==0){
      this.httpService.presentToast("请登录/注册后再操作")
    }
  }
  //点击下载
  download(){
    this.app.getRootNav().push('DownloadUrlPage')
  }
  //点击进入我的信息
  myInformation(){
    this.app.getRootNav().push('MyInformationPage')
  }
  //初始化获得数据
  // ngOnInit():void{
  //   var show=localStorage.getItem("token");
  //   console.log(show);
  //   if(show){
  //     this.showWhat=1;
  //   }else if(!show){
  //     this.showWhat=0
  //   }
  //   console.log(this.showWhat);
  //   if(this.showWhat==1) {
  //     this.httpService.getOrganizea('/app/get/company', {}
  //
  //     ).then(
  //       res => this.handleSuccess(res));
  //
  //   }
  // }

  handleSuccess(result){
    if(typeof result=='string'){
      result=JSON.parse(result)
    }
    console.log(result);
    if(result.message=='Access Denied'){
      this.showWhat=0
    }else if(result.message==''){
      this.showWhat=1;
      this.data=result.data
    }

  }
  //跳转到登录界面
  login(){
    this.app.getRootNav().push('GuidPage')
  }
  //跳转到我的产品界面
  myProduction(){
    if(this.showWhat==1) {
      this.app.getRootNav().push('MyProductionPage')
    }else if(this.showWhat==0){
      this.httpService.presentToast("请登录/注册后再操作")
    }
  }
  myApply(){

    if(this.showWhat==1) {
      this.app.getRootNav().push('MyApplyPage')
    }else if(this.showWhat==0){
      this.httpService.presentToast("请登录/注册后再操作")
    }
  }
  myInPurchase(){
    if(this.showWhat==1) {
      this.app.getRootNav().push('MyInPurchasePage')
    }else if(this.showWhat==0){
      this.httpService.presentToast("请登录/注册后再操作")
    }
  }
}
