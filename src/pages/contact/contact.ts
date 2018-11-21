import { Component } from '@angular/core';
import { NavController, App,NavParams  } from 'ionic-angular';
import { MyPurchasePage} from "./my-purchase/my-purchase"
import { HttpService} from '../../service/HttpService';
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
    // this.httpService.getOrganizea('/user/app/get/company', {}
    //    ).then(
    //       res => this.handleSuccess(res));
  }
  ngOnInit(): void {
    var show=localStorage.getItem("token");
    if(show){
      this.showWhat=1;
    }else {
      this.showWhat=0;
    }
    if(this.showWhat==1){
      this.httpService.getOrganizea('/user/app/get/company', {}
      ).then(
        res => this.handleSuccess(res));
    }
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
  handleSuccess(result){
    if(typeof result=='string'){
      result=JSON.parse(result)
    }
    console.log(result);
    if(result.data.logo==""){
      result.data.logo='../../assets/imgs/common.png'
    }
    console.log(result.data.logo)
    // if(result.message=='Access Denied'){
    //   this.showWhat=0
    // }else if(result.message==''){
    //   this.showWhat=1;
      this.data=result.data
    // }
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
