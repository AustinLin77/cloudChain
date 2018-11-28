import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService} from '../../../service/HttpService';
/**
 * Generated class for the MyPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-purchase',
  templateUrl: 'my-purchase.html',
})
export class MyPurchasePage {
  showNoContent:boolean=false;
  data=[];
  pageSize:number=5;
  pageNum:number;
  cnt:number;
  flag=0;
  whatFlag;
  isCopy;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
  }
   //初始化获得数据（判断是我的报价还是我收到的报价）
  ngOnInit():void{
    if(localStorage.getItem('whatFlag')=='0'){
      this.isCopy='0';
    }else if(localStorage.getItem('whatFlag')=='1'){
      this.isCopy='1';
    }
    console.log(localStorage.getItem('whatFlag')+"aaaaaaaaaaaa"+ this.isCopy);
    this.pageNum=1;
    this.httpService.getOrganizea('/app/quotation/list', {'isCopy': this.isCopy,'pageSize':this.pageSize,'pageNum':this.pageNum}
    ).then(
      res => this.handleSuccess(res))
      .catch(error => this.handleError(error));
  }
  handleError(error){
    console.log(error)
  }

  handleSuccess(result){
    localStorage.removeItem('whatFlag');
    if(result.data.length==0){
      this.showNoContent=true
      // if(this.isCopy==0){
      //   this.httpService.presentToast("您还没有对任何产品作出报价")
      // }else if(this.isCopy==1){
      //   this.httpService.presentToast("没有收到报价")
      // }
    }
    console.log(result);
    this.pageNum++;
    this.cnt=result.data.length;
    if(this.cnt<this.pageSize){
      console.log(this.cnt);
      this.flag=1;
    }
    for(var i=0;i<result.data.length;i++){
      switch (result.data[i].currency){
        case 'CNY':
          result.data[i].currency='￥';
          break;
        case 'USD':
          result.data[i].currency='$';
          break;
      }this.data.push(result.data[i])
    }
  }
  //跳转到报价详情
  quotationDetails(id){
    this.navCtrl.push('QuotationDetailsPage',{'id':id})
  }
  //下滑刷新函数
  doInfinite(infiniteScroll){
    if(this.flag==1) {
      infiniteScroll.enable(false);
    }else{
    setTimeout(() => {
      infiniteScroll.complete();
      this.httpService.getOrganize('/app/quotation/list', {'isCopy':'0','pageSize':this.pageSize,'pageNum':this.pageNum}
      ).then(
        res => this.handleSuccess(res));
    }, 2000);}
  }
}
