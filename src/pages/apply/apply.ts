import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { ApplyDetailsPage} from '../apply-details/apply-details';
import { HttpService } from '../../service/HttpService';
/**
 * Generated class for the ApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
})
export class ApplyPage {
  data = [];
  pageNum: number;
  pageSize =8;
  total:number;
  chain;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
    this.chain=localStorage.getItem('chain');
    console.log(this.chain)

  }
//返回
  ownerBack() {
    this.navCtrl.setRoot(TabsPage);
  }
//带参数跳转
  appliesDetails(a) {
    this.navCtrl.push('ApplyDetailsPage', {applyId: a});
  }
//下滑刷新
  doInfinite(infiniteScroll) {
    //等于数据总长度关闭下滑刷新
    if (this.data.length==this.total) {
      infiniteScroll.enable(false);
    }else{
    setTimeout(() => {
      infiniteScroll.complete(console.log("aaaa"));
      this.httpService.get('/no/filter/app/require/goods/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize}
      ).then(
        res => this.handleSuccess(res));
    }, 2000);
  }}
//获取数据
  ngOnInit(): void {
    this.pageNum = 1;
    this.httpService.get('/no/filter/app/require/goods/list', {'pageNum': this.pageNum, 'pageSize': this.pageSize}
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
      }
    }


  }
}
