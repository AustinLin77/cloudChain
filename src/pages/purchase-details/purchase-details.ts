import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides, AlertController} from 'ionic-angular';
import { ViewChild} from '@angular/core';
import { HttpService } from '../../service/HttpService';
import { PurchasePage} from "../purchase/purchase"
import { PurchaseStatusPage} from "../purchase-status/purchase-status"
import { LoginPage} from "../login/login"
/**
 * Generated class for the PurchaseDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-details',
  templateUrl: 'purchase-details.html',
})
export class PurchaseDetailsPage {
  @ViewChild('sliders')
  sliders : Slides;
  url3='../../assets/imgs/f1.jpg';
  slides=[this.url3];
  flag:boolean=false;
  data={
      'name':'好粉',
      'price':'500',
      'time':'5天3时18分7秒',
      'area':'广东深圳',
      'startDate':'2017-12-11',
      'endDate':'2018-05-14',
      'organizeNum':'500吨',
      'guaranteeNum':'500元',
      'companyNum':'400',
      'applyNum':'2000',
      'infomation':'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊' +
      'v啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'};
  currencyC;
  currency=['美元','人民币'];
  selectOptionsOne;
  scrollTop;
  area:string;
  num:number;
  unit:string;
  note:string;
  numOfPic:boolean;
  orderId;
  organizations=[];
  organization;
  status;
  url='/app/group/shopping/add/';
  url1='/no/filter/app/goods/detail/';
  url2='/app/goods/sign/up/';
  chain;
  showWhat;
  subData;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService : HttpService,public alertCtrl: AlertController) {
  }
  //初始化获得用户登录与否
  ionViewWillEnter(){
    this.sliders.startAutoplay();
    var show=localStorage.getItem("token");
    if(show){
      this.showWhat=1;
    }else {
      this.showWhat=0;
    }
    console.log(this.showWhat);
  }
  ionViewWillLeave(){
    this.sliders.stopAutoplay();
  }
  //初始化获得用户手机平台
  ionViewDidLoad() {
    this.chain=localStorage.getItem('chain');
    console.log(this.chain);
    console.log('ionViewDidLoad PurchaseDetailsPage');
    this.selectOptionsOne={
      title: '选择机构',
      mode: 'md'
    };
  }
  //初始化获得数据
  ngOnInit():void{
    if(localStorage.getItem('myFlag')=='bbb'){
    this.orderId=this.navParams.data.orderId;
     localStorage.setItem('id',this.orderId);
     this.numOfPic=false;
     this.url1+=localStorage.getItem("id");
     this.httpService.get(this.url1, {}
    ).then(
       res => this.handleSuccess(res));
     this.httpService.getOrganize('/app/current/user/office', {}
    ).then(
      res => this.handleThirdSuccess(res));
    }else if(localStorage.getItem('myFlag')=='aaa'){
      this.numOfPic=false;
      this.url1+=localStorage.getItem("id");
      console.log(localStorage.getItem("id"));
      this.httpService.get(this.url1, {}
      ).then(
        res => this.handleSuccess(res));
      this.httpService.getOrganize('/app/current/user/office', {}
      ).then(
        res => this.handleThirdSuccess(res));
    }
  }
  handleThirdSuccess(result){
    console.log(result);
    this.organizations=result.data;
  }
  handleSuccess(result){
    this.url1='/no/filter/app/goods/detail/';
    console.log(result);

    this.unit=result.data.unit;
    var groupTo=new Date(result.data.groupTo);
    console.log(groupTo);
    var nowTime = groupTo.getTime();
    var valueTime=nowTime-result.data.appCurrentTime;
    console.log(valueTime);
    var newValueTime=Math.ceil(valueTime/1000);
    window.setInterval(function () {
      result.data.store=Math.floor(newValueTime/86400);
      result.data.type=Math.floor((newValueTime-result.data.store*86400)/3600);
      result.data.salesVolume=Math.floor((newValueTime-result.data.store*86400-result.data.type*3600)/60);
      if( result.data.salesVolume<=9){result.data.salesVolume='0'+result.data.salesVolume}
      result.data.whetherIn=Math.floor((newValueTime-result.data.store*86400-result.data.type*3600-result.data.salesVolume*60));
      if(result.data.whetherIn<=9){result.data.whetherIn='0'+result.data.whetherIn}
      newValueTime--
    },1000);

    this.status=result.data.gatherStatus;
    this.data=result.data;
    if(!result.data.detail){
      result.data.detail='无商品信息'
    }
    if(!result.data.currency){
      result.data.currency='元';
    }
    switch (result.data.currency){
      case 'CNY':
        result.data.currency='元';
        break;
      case 'USD':
        result.data.currency='刀';
        break;
    }
    if(!result.data.imgPathList){
      this.slides=[];
      this.numOfPic=false;
    }else{
      this.slides=result.data.imgPathList;
      if(result.data.imgPathList.length<=1){
        this.numOfPic=false;
      }
    }

  }
  //登录/注册提醒弹窗
  loadingAlert(){
    let alert = this.alertCtrl.create({
      message: '请登录/注册后再操作',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '登录',
          handler: () => {
            this.navCtrl.push('GuidPage')
          }
        }
      ]
    });
    alert.present();
  }
  //跳转到报名信息
  goToEnrollInfo(){
    if(this.showWhat==0){
      this.loadingAlert()
    }else{
    console.log(this.orderId);
     this.navCtrl.push('EnrollInfoPage',{'orderId':localStorage.getItem('id')})
   }}
   //背景不可滑动
  onHandler(e) {
    e.preventDefault();
  }
  //开启报名窗口（背景不可滑动）
  enrollIn(){
    this.flag = true;
    if(this.flag){
      document.addEventListener('touchmove', this.onHandler, false);
    }
  }
  //关闭报名窗口
  myCancel(){
     this.flag = false;
    // window.onscroll=function(){
    //   document.body.scrollTop = document.body.scrollTop;//关闭后清除保存位置的值
    // }
   }
   //判断能否进行报名
  myCheck(){
    if(this.showWhat==0){
      this.loadingAlert()
    }else{
      if(this.status!='1'){
       this.httpService.presentToast("不能进行报名")
      }else{
        this.url2+=this.orderId;
        this.httpService.getOrganize(this.url2, {}
        ).then(
          res => this.handleSecondSuccess(res));
      }
    }
  }
  ownerBack(){
     this.navCtrl.push('PurchasePage')
   }
  handleSecondSuccess(result){
    this.url2='/app/goods/sign/up/';
    if(result.statusCode==1103){
      this.httpService.presentToast("不能给自己报价")
    }else if(result.statusCode==404){
      this.httpService.presentToast("没有该商品")
    }else if(result.statusCode=200){
      //可以报价则开启报价窗口
      this.enrollIn();
    }
  }
  //报名提交
  mySubmit(){
    if(!this.organization){
      this.httpService.presentToast("请正确选择机构");
     return
    }else if(!this.area){
      this.httpService.presentToast("请正确填写收货地址");
      return
    }else if(this.num==null||this.num==0){
      this.httpService.presentToast("请正确填写申请数量");
      return
    }else if(!this.unit){
      this.httpService.presentToast("请正确填写单位");
      return
    }
    if(this.note){
    this.subData={
      "qty": this.num,
      "unit": this.unit,
      "remark": this.note,
      "officeId": this.organization,
      "receiverAddr":this.area
     };
    }else if(this.note==null){
      this.subData= {
        "qty": this.num,
        "unit": this.unit,
        "officeId": this.organization,
        "receiverAddr":this.area
      }
    }
    this.url+=localStorage.getItem('id');
    this.httpService.newPostBody(this.url,this.subData).then(res => this.handleNewSuccess(res));
  }
  handleNewSuccess(result){
    this.flag=false;
    console.log(result);
    if(result.statusCode==200){
      this.navCtrl.push('PurchaseStatusPage',{'mes':'操作成功'})
    }else{
      this.httpService.presentToast("报名失败");
      this.flag=false
    }
  }
}
