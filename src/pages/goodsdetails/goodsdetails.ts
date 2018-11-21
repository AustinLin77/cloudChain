import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides, AlertController } from 'ionic-angular';
import { ViewChild} from '@angular/core';
import { SuppliersDetailsPage} from '../suppliers-details/suppliers-details';
import { ConfirmPage} from '../confirm/confirm';
import {TabsPage} from "../tabs/tabs";
import { HttpService } from '../../service/HttpService';
import { GlobalVariable} from '../../globalVariable/globalVariable';
import {ProductionPage} from "../production/production";
import { LoginPage } from "../login/login"
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
/**
 * Generated class for the GoodsdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goodsdetails',
  templateUrl: 'goodsdetails.html',
})
export class GoodsdetailsPage {
  @ViewChild('sliders')
  sliders : Slides;
  haveValue:boolean;
  numOfPic:boolean=true;
  url='/no/filter/app/goods/detail/';
  url4='/app/shopping/car/add/';
  url1='../../assets/imgs/f1.jpg';
  slides=[this.url1];
  name:string;
  companyName:string;
  price:number;
  unit:string;
  currency:string;
  carListNum:number;
  picUrl:string;
  flag=false;
  flag1=false;
  url5='/app/buy/goods/now/';
  shopNum=GlobalVariable.shopCount;
  id:string;
  sellerName:string;
  carListData=[];
  data={};
  chain;
  idss;
  what;
  canGo;
  showWhat;
  photos=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService,
              public alertCtrl: AlertController,public modalCtrl: ModalController) {
  }
  //后退
  ownerBack(){
    console.log(this.what);
    this.navCtrl.push('ProductionPage',{id:this.idss,whatSend:this.what})
    // this.navCtrl.pop({id:this.idss,whatSend:this.what})
  }
  ionViewWillLeave(){
    this.sliders.stopAutoplay();
  }
  ionViewDidLoad() {
    this.chain=localStorage.getItem('chain');
    console.log(this.chain)
  }
  //未登录提示登录注册
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
  //跳转到供应商详情界面
  suppliersDetails(){
    if(this.showWhat==0){
      this.loadingAlert()
    }else{
     this.navCtrl.push('SuppliersDetailsPage',{'companyName':this.companyName});}
  }
  //提交
  confirm(){
    if(this.showWhat==0){
      this.loadingAlert()
    }else{
    this.url5+=this.id;
    //判断是否购买自家产品
    this.httpService.getOrganizea(this.url5, {}
    ).then(
      res => this.handleFirstSuccess(res))
      .catch(error => this.handleError(error));
    }}
  handleFirstSuccess(result){
    this.url5='/app/buy/goods/now/';
      console.log(result);
      if(result.statusCode==200){
        this.navCtrl.push('ConfirmPage',
          {'companyName':this.companyName,
            'url':this.url1,
            'name':this.name,
            'price':this.price,
            'unit':this.unit,
            'currency':this.currency,
            'id':this.id});
      }else if(result.statusCode==1105){
        this.httpService.presentToast("不能购买自家商品");
        this.url5='/app/buy/goods/now/';
      }else  if(result.statusCode==404){
        this.httpService.presentToast("没有该商品");
        this.url5='/app/buy/goods/now/';
      }
    }
  //新增进货单
  addShopNum() {
  if(this.showWhat==0){
    this.loadingAlert()
  }else{
      //获取购物车总数
    this.httpService.getOrganizea('/app/shopping/car/list', {}
    ).then(
      res => this.handleSecondSuccess(res))
      .catch(error => this.handleError(error));
   }
  }
  handleError(error){
    console.log(error)
  }
  //判断重复添加购物车按钮禁用
  handleSecondSuccess(result){
    console.log(result);
    this.carListData=result.data;
    console.log(this.carListData);
    for(let i=0;i<this.carListData.length;i++){
      if(this.companyName == this.carListData[i].company){
        for(var a=0;a<this.carListData[i].content.length;a++){
          if(this.name==this.carListData[i].content[a].goodName){
            this.flag1=true;
          }
        }
      }
    }
    if(this.flag1){
      this.httpService.presentToast("您的购物车已经添加过此商品");
      this.flag=true;
    }else{   //有此商品的话提示且禁用，没有的话加入购物车。
      var data={
        'itemId':this.id,
        'quantity':1,
        'sellerName':this.sellerName
      };
      this.url4+=this.id;
      this.httpService.newPostBody(this.url4,data).then(res => this.handleNewSuccess(res));}
  }
  handleNewSuccess(result) {
     console.log(result);
     if(result.statusCode==1105){
       this.httpService.presentToast("不能添加自家商品");
       this.flag=true;
     }
    if(result.statusCode==200){  //加入购物车成功后查询此时购物车条数
      this.httpService.presentToast("添加成功");
      this.httpService.getOrganize('/app/shopping/car/list',  {}
      ).then(
        res => this.handleThirdSuccess(res));
    }
    this.url4='/app/shopping/car/add/';
  }
  handleThirdSuccess(result){
    console.log(result);    //将全局购物车条数类下的条数和小红点绑定的条数修改为此时购物车条数
    this.carListNum=result.total;
    console.log(this.carListNum);
    GlobalVariable.shopCount=this.carListNum;
    this.shopNum=result.total;
  }
  //进货单页面
  goToShop(){
     this.navCtrl.setRoot(TabsPage,{'myindex':1});
   }
   //初始化获取数据
  ionViewWillEnter() {
    var show=localStorage.getItem("token");
    if(show){
      this.showWhat=1;
    }else {
      this.showWhat=0;
    }
    console.log(this.showWhat);
    this.url='/no/filter/app/goods/detail/';
    this.sliders.startAutoplay();
     this.name = this.navParams.data.name;
     this.id = this.navParams.data.id;
     this.url+=this.id;
     this.idss=this.navParams.data.idss;
     this.what=this.navParams.data.what;
     this.canGo=this.navParams.data.canGo;
     console.log(this.idss);
     console.log(this.canGo);
     this.httpService.get(this.url, {}
     ).then(
       res => this.handleSuccess(res));

  }
  handleSuccess(result) {
    console.log(result);
    this.slides=result.data.imgPathList;
    if(result.data.imgPathList.length<=1){
      this.numOfPic=false;
    }
    console.log(this.slides);
    this.data=result.data;
    this.companyName=result.data.companyName;
    console.log(this.companyName);
    this.price=result.data.price;
    this.unit=result.data.unit;
    // this.picUrl=result.data.imgPathList;
    // if(result.data.imgPathList==null){
    //   result.data.imgPathList='../../assets/imgs/f1.jpg';
    // }else if(result.data.imgPathList.length>1){
    //   result.data.imgPathList=result.data.imgPathList[0];
    // }
    //没有规格则显示无规格
    if(result.data.propList.length==0){
      this.haveValue=true;
    }else{
      this.haveValue=false;
    }
    //无商品信息则显示无信息
    if(!result.data.description){
      result.data.description='无商品信息'
    }
    this.sellerName=result.data.companyName;
    switch (result.data.hot){
      case 0:
        result.data.hot='低';
        break;
      case 1:
        result.data.hot= '热';
        break;
    }
    if(!result.data.currency){
      result.data.currency='￥';
    }
    switch (result.data.currency){
      case 'CNY':
        result.data.currency='￥';
        this.currency=result.data.currency;
        break;
      case 'USD':
        result.data.currency='$';
        this.currency=result.data.currency;
        break;
    }
    this.currency=result.data.currency;
    this.url1=result.data.imgPathList[0];
    document.getElementById('description').innerHTML=result.data.description;
    // this.slides=result.data.imgPathList

  }
  //点击查看大图
  openBigImg(){
     for(var i=0;i<this.slides.length;i++){
       let a={url:this.slides[i]};
       this.photos.push(a)
     }
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,

    });
    modal.present();
  }
}
