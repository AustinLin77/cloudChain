import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { PurchaseDetailsPage} from '../purchase-details/purchase-details';
import { HttpService } from '../../service/HttpService';
import { PopoverController } from 'ionic-angular';
/**
 * Generated class for the PurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {
  myAll:number=6;
  showSift:boolean=false;
  data =[];
  pageNum: number;
  pageSize = 6;
  total: number;
  option=[];
  chain;
  all=5;
  gatherStatus;
  flag:number=1;
  open:number=0;
  twoflag:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService,public popoverCtrl: PopoverController) {
  }
  allF(){
    this.myAll=0;
  }
  onGoingF(){
    this.myAll=3;
  }
  alreadyF(){
    this.myAll=1;
  }
  soonF(){
    this.myAll=4;
  }
  unreadyF(){
    this.myAll=2;
  }
  reset(){
    this.myAll=5;
  }
  confirm(){
    var all=this.myAll
    this.all=all;
    console.log(all);
    if(this.all==6||this.all==null){
      return;
    }
    if(this.all==0||this.all==1||this.all==2||this.all==3||this.all==4){
      this.twoflag=1
    }
    console.log(this.flag)
    switch(all){
      case 0:
        this.gatherStatus=2;
        break;
      case 1 :
        this.gatherStatus=4;
        break;
      case 2 :
        this.gatherStatus=3;
        break;
      case 3 :
        this.gatherStatus=1;
        break;
      case 4 :
        this.gatherStatus=0;
        break;
    }
    this.pageNum = 1;
    this.httpService.get('/no/filter/app/gather/goods/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize,'gatherStatus':this.gatherStatus}
    ).then(
      res => this.handleSearchSuccess(res));
    this.showSift=!this.showSift
  }

   //初始化获得是哪个平台
  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchasePage');
    this.chain=localStorage.getItem('chain');
    console.log(this.chain)
  }
  //返回
  ownerBack() {
    // this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot()
  }
  myShowSift(){
    this.showSift=true
  }
  closeSift(){
    this.showSift=!this.showSift
  }
  //下滑刷新
  doInfinite(infiniteScroll) {
    //等于数据总长度关闭下滑刷新
    if (this.data.length==this.total) {
      this.flag=0;
      infiniteScroll.enable(false);
    }else if(this.all==5){
      setTimeout(() => {
        infiniteScroll.complete();
        this.httpService.get('/no/filter/app/gather/goods/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize}
        ).then(
          res => this.handleSuccess(res));
      }, 2000);
     }else {
      setTimeout(() => {
        infiniteScroll.complete();
        this.httpService.get('/no/filter/app/gather/goods/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize,'gatherStatus':this.gatherStatus}
        ).then(
          res => this.handleSuccess(res));
      }, 2000);
     }
    }
  //获取数据
  ngOnInit(): void {
    this.pageNum = 1;
    this.httpService.get('/no/filter/app/gather/goods/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize}
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result) {
    this.pageNum++;
    this.total=result.total;
    console.log(result);
    if(result.data.length===0){
      alert("当前无数据")
    }else{
      for (var i = 0; i < result.data.length; i++) {
        this.data.push(result.data[i]);
        if(!result.data[i].imgPathList){
          result.data[i].imgPathList=[]
        }else if (result.data[i].imgPathList.length > 1) {
          result.data[i].imgPathList = result.data[i].imgPathList[0];
        }
        if (!result.data[i].currency) {
          result.data[i].currency = '￥';
        }
        switch (result.data[i].currency) {
          case 'CNY':
            result.data[i].currency = '￥';
            break;
          case 'USD':
            result.data[i].currency = '$';
            break;
        }
        switch (result.data[i].gatherStatus) {
          case '0':
            result.data[i].gatherStatus = '未开始';
            break;
          case '1':
            result.data[i].gatherStatus = '进行中';
            break;
          case '2':
            result.data[i].gatherStatus = '已结束';
            break;
          case '3':
            result.data[i].gatherStatus = '未成团';
            break;
          case '4':
            result.data[i].gatherStatus = '已成团';
            break;
        }
      }
    }
  }
  //跳转到集采详情界面，携带参数
  goToPurchaseDetails(n){
    console.log(n);
    localStorage.setItem('myFlag','bbb');
    this.navCtrl.push('PurchaseDetailsPage',{"orderId":n})
  }
  //根据集采状态筛选集采数据
  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create('PopoverrPage');
  //   popover.present({
  //     ev: myEvent
  //   });
  //   popover.onDidDismiss((all)=>{
  //     this.all=all;
  //     console.log(all);
  //     if(this.all==6||this.all==null){
  //       return;
  //     }
  //     if(this.all==0||this.all==1||this.all==2||this.all==3||this.all==4){
  //       this.twoflag=1
  //     }
  //     console.log(this.flag)
  //     switch(all){
  //       case 0:
  //         this.gatherStatus=2;
  //         break;
  //       case 1 :
  //         this.gatherStatus=4;
  //         break;
  //       case 2 :
  //         this.gatherStatus=3;
  //         break;
  //       case 3 :
  //         this.gatherStatus=1;
  //         break;
  //       case 4 :
  //         this.gatherStatus=0;
  //         break;
  //     }
  //     this.pageNum = 1;
  //     this.httpService.get('/no/filter/app/gather/goods/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize,'gatherStatus':this.gatherStatus}
  //     ).then(
  //       res => this.handleSearchSuccess(res));
  //   })
  // }
  handleSearchSuccess(result){
    console.log(result);
    this.pageNum++;
    this.total=result.total;
    for (var i = 0; i < result.data.length; i++) {
      if (result.data[i].imgPathList.length > 1) {
        result.data[i].imgPathList = result.data[i].imgPathList[0];
      }
      if(!result.data[i].currency){
        result.data[i].currency='￥';
      }
      switch (result.data[i].currency){
        case 'CNY':
          result.data[i].currency='￥';
          break;
        case 'USD':
          result.data[i].currency='$';
          break;
      }
      switch(result.data[i].gatherStatus){
        case '0':
          result.data[i].gatherStatus ='未开始';
          break;
        case '1':
          result.data[i].gatherStatus ='进行中';
          break;
        case '2':
          result.data[i].gatherStatus ='已结束';
          break;
        case '3':
          result.data[i].gatherStatus ='未成团';
          break;
        case '4':
          result.data[i].gatherStatus= '已成团';
          break;
      }
    }
    this.data=result.data
  }
}
