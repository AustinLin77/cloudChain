import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { TabsPage } from "../tabs/tabs";
/**
 * Generated class for the MyProductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-production',
  templateUrl: 'my-production.html',
})
export class MyProductionPage {
  products = [];
  pageNum: number;
  pageSize =8;
  showNoContent:boolean=false;
  total:number;
  chain;
  cnt:number;
  flag :boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService) {
  }
   //初始化获取用户手机平台
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
    this.chain=localStorage.getItem('chain');
    console.log(this.chain)
  }
  //返回
  ownerBack() {
    // this.navCtrl.setRoot(TabsPage);
    this.navCtrl.pop()
  }
  //获取数据
  ngOnInit(): void {
    this.pageNum = 1;
    this.httpService.getOrganizea('/app/product/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize}
    ).then(
      res => this.handleSuccess(res))
      .catch(error => this.handleError(error));
  }
  handleError(error){
    console.log(error)
  }
  handleSuccess(result){
    console.log(result);
    if(result.data.length==0){
      document.getElementById("content").style.backgroundColor='white';
      this.showNoContent=true
      // this.httpService.presentToast("您还没有发布任何产品")
    }
    this.pageNum++;
    console.log(result);
    this.cnt=result.data.length;
    if(this.cnt<this.pageSize){
      this.flag=false;
    }
    for(var i=0;i<result.data.length;i++){
      this.products.push(result.data[i]);
      if(!result.data[i].imgPathList){
        result.data[i].imgPathList='../../assets/imgs/f1.jpg';
      }else if(result.data[i].imgPathList.length>1){
        result.data[i].imgPathList=result.data[i].imgPathList[0];
      }
      switch (result.data[i].hot){
        case 0:
          result.data[i].hot='低';
          break;
        case 1:
          result.data[i].hot= '热';
          break;
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
      if(result.data[i].gatherStatus){
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
      }else if(!result.data[i].gatherStatus){
        result.data[i].gatherStatus='非集采'
      }
    }console.log(this.products);
  }
  //下滑刷新
  doInfinite(infiniteScroll){
    setTimeout(() => {
      infiniteScroll.complete();
      this.httpService.getOrganize('/app/product/list', {'pageNum':this.pageNum, 'pageSize':this.pageSize}
      ).then(
        res =>  this.handleSuccess(res));
      if(!this.flag) {
        infiniteScroll.enable(false);
      }}, 2000);
  }
}
