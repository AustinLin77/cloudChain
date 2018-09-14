import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import {ApplyDetailsPage} from "../apply-details/apply-details";
/**
 * Generated class for the QuotationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotation',
  templateUrl: 'quotation.html',
})
export class QuotationPage {
  url='/app/quotation/add/';
  id;
  price:number;
  currencyC:string='人民币';
  rate:number;
  selectOptionsOne;
  selectOptionsTwo;
  selectOptionsThree;
  selectOptionsFour;
  selectOptionsFive;
  myDateStart:string;
  myDateEnd:string;
  introduce:string;
  contactPerson:string;
  myWidth;
  contactNum:number;
  min:number;
  max:number;
  data=[{
          'currency':['美元','人民币'],
          'rate':[0.5,1,1.5,2,2.5,3],
          'minOrder':[100,200,300,400,500,600],
          'maxOrder':[10000,20000,30000,40000,50000,60000]
  }];
  organizations=[];
  organization;
  subData;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
  }
  //初始化数据
  ionViewDidLoad() {
    this.myWidth=screen.width;
    this.selectOptionsOne={
      title: '选择币种',
      mode: 'md'
    };
    this.selectOptionsTwo={
      title: '选择税率',
      mode: 'md'
    };
    this.selectOptionsThree={
      title: '选择最小起订量',
      mode: 'md'
    };
    this.selectOptionsFour={
      title: '选择最大起订量',
      mode: 'md'
    };
    this.selectOptionsFive={
      title: '选择机构',
      mode: 'md'
    }
  }
  //含税价填写完成后检查
  adjust(){
    console.log(this.organization);
    console.log(typeof this.rate);
    if(this.price<=0){
      this.price=0;
      this.httpService.presentToast("请正确填写含税价");
    }
  }
  //初始化获取数据
  ngOnInit():void {
    this.id=this.navParams.data.id;
    this.httpService.getOrganize('/app/current/user/office', {}
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result){
    console.log(result);
    this.organizations=result.data;
  }
  //报价提交
  mySubmit(){
    if(this.currencyC=='美元'){
      this.currencyC='USD';
    }else if(this.currencyC=='人民币'){
      this.currencyC='CNY'
    }
    if(this.price==0||this.price==null){
      this.httpService.presentToast('请填写含税价');
      return
    }else if(this.currencyC==null){
      this.httpService.presentToast('请选择币种');
      return
    }else if(this.min==null){
      this.httpService.presentToast('请选择最小起订量');
      return
    }else if(this.max==null){
      this.httpService.presentToast('请选择最大起订量');
      return
    }else if(this.myDateStart==null){
      this.httpService.presentToast('请选择需求起始日');
      return
    }else if(this.myDateEnd==null){
      this.httpService.presentToast('请选择需求结束日');
      return
    } else if(this.organization==null){
      this.httpService.presentToast('请选择机构');
      return
    }else if(this.contactPerson==null){
      this.httpService.presentToast('请填写联系人');
      return
    }else if(this.contactNum==null){
      this.httpService.presentToast('请填写联系机构');
      return
    }
    if(this.introduce==null) {
     this.subData = {
        'officeId': this.organization,
        'price': this.price,
        'currency': this.currencyC,
        "minQty": this.min,
        "maxQty": this.max,
        "fromDate": this.myDateStart,
        "toDate": this.myDateEnd,
        "contactor": this.contactPerson,
        "contactPhone": this.contactNum
      }
    }else if(this.introduce){
     this.subData={
      'officeId':this.organization,
      'price':this.price,
      'currency':this.currencyC,
      "minQty": this.min,
      "maxQty": this.max,
      "fromDate": this.myDateStart,
      "toDate": this.myDateEnd,
      "description": this.introduce,
      "contactor": this.contactPerson,
      "contactPhone": this.contactNum
      };
    }
    this.url+=this.id;
    this.httpService.newPostBody(this.url,this. subData).then(res => this.handleNewSuccess(res));
  }
  handleNewSuccess(result){
    console.log(result);
     if(result.message=='操作成功'){
       this.httpService.presentToast("新增报价成功")
     }else{
       this.httpService.presentToast("新增报价失败")
     }
     this.navCtrl.popTo('ApplyDetailsPage')
  }
}
