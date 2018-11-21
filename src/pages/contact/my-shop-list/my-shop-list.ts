import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../service/HttpService';

/**
 * Generated class for the MyShopListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-shop-list',

  templateUrl: 'my-shop-list.html',
})
export class MyShopListPage {
  allData=[];
  delOrderId=[];
  delUrl='/th/order/batch/del';
  myUnit='￥';
  pageNum:number=0;
  pageSize=8;
  cnt:number;
  flag:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService) {
  }



  //初始化获得数据
  ngOnInit():void{

    this.pageNum = 1;
      this.httpService.getOrganizea('/app/order/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize}
      ).then(
        res => this.handleSuccess(res))
        .catch(error => this.handleError(error));
  }
  handleError(error){
    console.log(error)
  }
  handleReSuccess(result){
    if(result.data.length==0){
      this.httpService.presentToast("无更多订单")
    }
    console.log(this.pageNum);
    this.pageNum++;
    this.cnt=result.pageNum*result.pageSize;
    console.log(this.cnt);
    if(this.cnt>result.total){
      this.flag=false;
    }
    console.log(result);
    for(var i=0;i< result.data.length;i++){
      result.data[i].total=0;
      for(var a=0;a< result.data[i].content.length;a++){
        result.data[i].total=Number((result.data[i].total+parseFloat(result.data[i].content[a].price)*result.data[i].content[a].qty).toFixed(2));
        result.data[i].content[a].isChecked=0;
        if(!result.data[i].content[a].currency){
          result.data[i].content[a].currency='￥';
        }
        if(result.data[i].content[a].imgPathList.length>1){
          result.data[i].content[a].imgPathList= result.data[i].content[a].imgPathList[0]
        }
        switch (result.data[i].content[a].currency){
          case 'CNY':
            result.data[i].content[a].currency='￥';
            break;
          case 'USD':
            result.data[i].content[a].currency='$';
            break;
        }
      }}
    for(var e=0;e<result.data.length;e++){
      this.allData.push(result.data[e])
    }

  }
  handleSuccess(result){
    if(result.data.length==0){
      this.httpService.presentToast("您还没有任何订单")
    }
    console.log(this.pageNum);
    this.pageNum++;
    this.cnt=result.pageNum*result.pageSize;
    console.log(this.cnt);
    if(this.cnt>result.total){
      this.flag=false;
    }
    console.log(result);
    for(var i=0;i< result.data.length;i++){
      result.data[i].total=0;
      for(var a=0;a< result.data[i].content.length;a++){
        result.data[i].total=Number((result.data[i].total+parseFloat(result.data[i].content[a].price)*result.data[i].content[a].qty).toFixed(2));
        result.data[i].content[a].isChecked=0;
        if(!result.data[i].content[a].currency){
          result.data[i].content[a].currency='￥';
        }
        if(result.data[i].content[a].imgPathList.length>1){
          result.data[i].content[a].imgPathList= result.data[i].content[a].imgPathList[0]
        }
      switch (result.data[i].content[a].currency){
        case 'CNY':
          result.data[i].content[a].currency='￥';
          break;
        case 'USD':
          result.data[i].content[a].currency='$';
          break;
      }
    }}
    for(var e=0;e<result.data.length;e++){
      this.allData.push(result.data[e])
    }

  }
  //删除订单
  deleteNum(){
    for(var i=0;i<this.allData.length;i++){
      for(var j=0;j<this.allData[i].content.length;j++) {
        if(this.allData[i].content[j].isChecked){
          this.delOrderId.push(this.allData[i].content[j].id);
        }
      }
    }
    if(this.delOrderId.length==0){
      this.httpService.presentToast("请选择要删除的条目");
    }else{
    this.httpService.deleteId(this.delUrl, {'ids':this.delOrderId}
    ).then(
      res => this.handleDelSuccess(res));
  }}
  handleDelSuccess(result){
    this.delOrderId=[];
    console.log(result);
    if(result.statusCode==200){
     this.httpService.presentToast("删除订单成功")
    }else{
      this.httpService.presentToast("删除订单失败")
    }
    this.allData=[];
    this.pageNum=1;
    this.httpService.getOrganize('/app/order/list', {'pageNum':1,'pageSize':8 }
    ).then(
      res => this.handleSuccess(res));
  }
  //取消勾选清空
  cancel(){
    for(var i=0;i<this.allData.length;i++){
     for(var j=0;j<this.allData[i].content.length;j++) {
          this.allData[i].content[j].isChecked=0
       }
     }
  }
  //下滑刷新
  doInfinite(infiniteScroll){
    if(!this.flag) {
      infiniteScroll.enable(false);
    }else{
      setTimeout(() => {
        infiniteScroll.complete();
        this.httpService.getOrganize('/app/order/list', {'pageNum':this.pageNum,'pageSize':this.pageSize }
        ).then(
          res => this.handleReSuccess(res));
      }, 2000);
    }
  }
  // delete(option){
  //   for(var i=0;i<option.content.length;i++){
  //     console.log(option.content[i].id)
  //   }

  // }
}
