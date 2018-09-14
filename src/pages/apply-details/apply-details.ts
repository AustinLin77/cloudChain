import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { ViewChild} from '@angular/core';
import { AlertController,LoadingController } from 'ionic-angular';
import { QuotationPage} from '../quotation/quotation';
import { HttpService } from '../../service/HttpService';
import { LoginPage} from '../login/login'
/**
 * Generated class for the ApplyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-details',
  templateUrl: 'apply-details.html',
})
export class ApplyDetailsPage {
  @ViewChild('sliders')
  sliders : Slides;
  applyId;
  url3='../../assets/imgs/f1.jpg';
  slides=[this.url3];
  loading;
  contactName:string;
  contactNum:number;
  url='/app/goods/view/buyer/';
  url1='/no/filter/app/goods/detail/';
  url2='/app/check/quote/';
  data=[];
  numOfPic:boolean;
  showWhat;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private httpService: HttpService,public loadingController : LoadingController) {
  }

   //初始化获得是否登录标识
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
  //获取联系人
  contact(){
     if(this.showWhat==0){
       this.loadingAlert()
     }else{
    console.log(this.applyId);
    this.url+=this.applyId;
    this.httpService.getOrganize(this.url, {}
    ).then(
      res => this.handleFirstSuccess(res));}
  }
  handleFirstSuccess(result){
    this.url='/app/goods/view/buyer/';
   if(result.statusCode==1101){
      this.httpService.presentToast("无法获取联系人及联系方式")
   }else if(result.statusCode==200){
     let myMessage='联系人 : '+ this.contactName+'<br/>'+'联系方式 : '+'<a href="tel:'+this.contactNum+'">'+this.contactNum+'</a>';
     let confirm = this.alertCtrl.create({
       title: '买家联系方式',
       message: myMessage  ,

       buttons: [
         {
           text: '取消',
           handler: () => {
             console.log('Disagree clicked');
           }
         },
         {
           text: '确定',
           handler: () => {
             console.log('Agree clicked');
           }
         }
       ]
     });
     confirm.present();
   }
  }
  //跳转到报价界面
  GoToQuotation(){
    if(this.showWhat==0){
      this.loadingAlert()
    }else{
    this.url2+=this.applyId;
    this.httpService.getOrganize(this.url2, {}
    ).then(
      res => this.handleSecondSuccess(res));
    }
  }
  handleSecondSuccess(result){
    this.url2='/app/check/quote/';
    console.log(result);
    if(result.statusCode==1104){
      this.httpService.presentToast(result.message)
    }else if(result.statusCode==404){
      this.httpService.presentToast('没有该商品')
    }else if(result.statusCode==200){
      this.navCtrl.push('QuotationPage',{'id':this.applyId})
    }
  }
  //初始化获得数据
  ngOnInit():void {
    this.applyId=this.navParams.data.applyId;
    this.url1+=this.applyId;
    this.httpService.get(this.url1, {}
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result){
    console.log(result);
    this.data=result.data;
    this.contactName=result.data.contactor;
    this.contactNum=result.data.contactPhone;
    if(!result.data.imgPathList){
      this.slides=[];
      this.numOfPic=false;
    }else{
      this.slides=result.data.imgPathList;
      if(result.data.imgPathList.length<=1){
        this.numOfPic=false;
      }
    }
    if(!result.data.detail){
      result.data.detail='无说明信息'
    }
    console.log(this.slides);
    document.getElementById("detail").innerHTML=result.data.detail;
  }

}
