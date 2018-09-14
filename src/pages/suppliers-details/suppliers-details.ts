import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import {GoodsdetailsPage} from "../goodsdetails/goodsdetails";

/**
 * Generated class for the SuppliersDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suppliers-details',
  templateUrl: 'suppliers-details.html',
})
export class SuppliersDetailsPage {
  Url='/app/supplier/company/detail';
  companyName;
  data={};
  goodList=[];
  kinds='企业介绍';
  testArray=['企业介绍','销售商品'];
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService) {
  }
  //滑动函数
  swipeEvnet(event) {
    //向左滑
    if (event.direction == 2) {
      if (this.testArray.indexOf(this.kinds) < 1) {
        this.kinds = this.testArray[this.testArray.indexOf(this.kinds) + 1];
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.testArray.indexOf(this.kinds) > 0) {
        this.kinds = this.testArray[this.testArray.indexOf(this.kinds) - 1];
      }
    }
  }
  //初始化获得数据
  ngOnInit():void {
    this.companyName=this.navParams.data.companyName;
    this.httpService.getOrganizea(this.Url, {'name': this.companyName}
    ).then(
      res => this.handleSuccess(res))
      .catch(error => this.handleError(error));
  }
  handleError(error){
    console.log(error)
  }
  handleSuccess(result){
    console.log(result);
    this.data=result.data.companyProfile ;
    for(var i=0;i<result.data.goodsList.length;i++){
      if(result.data.goodsList[i].imgPathList.length>1){
        result.data.goodsList[i].imgPathList=result.data.goodsList[i].imgPathList[0]
      }
      if(!result.data.goodsList[i].currency){
        result.data.goodsList[i].currency='￥';
      }
      switch (result.data.goodsList[i].currency){
        case 'CNY':
          result.data.goodsList[i].currency='￥';
          break;
        case 'USD':
          result.data.goodsList[i].currency='$';
          break;
      }
      switch (result.data.goodsList[i].hot){
        case 0:
          result.data.goodsList[i].hot='低';
          break;
        case 1:
          result.data.goodsList[i].hot= '热';
          break;
      }
    }
    this.goodList=result.data.goodsList;
   console.log(this.goodList)
  }
  //携带参数跳转到商品详情
  goToGoodsDetails(a,b){
    this.navCtrl.push('GoodsdetailsPage',{name:a,id:b,canGo:true})

  }
}
