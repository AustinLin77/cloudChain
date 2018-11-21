import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs"
import { HttpService } from '../../service/HttpService';
import { InviteDetailsPage } from '../invite-details/invite-details'
/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {
  invites=[];
  pageNum:number;
  pageSize:number=13;
  cnt:number;
  flag:boolean;
  chain;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService,) {
  }
  //初始化获得手机平台
  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
    this.chain=localStorage.getItem('chain');
    console.log(this.chain)
  }
  ownerBack(){
    // this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot()
  }
  //跳转到招标详情界面
  inviteDetails(id){
    this.navCtrl.push('InviteDetailsPage',{id:id})
  }
  //初始化获得数据
  ngOnInit():void{
    this.pageNum=1;
    this.httpService.get('/no/filter/app/query/bidding/list', {'pageNum':this.pageNum,'pageSize':this.pageSize }
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result){
    this.pageNum++;
    console.log(result);
    for(var i=0;i<result.data.length;i++){
      var thiFlag=i%2;
      if (thiFlag==1){result.data[i].flag='单数'}else{result.data[i].flag='双数'}
      this.invites.push(result.data[i]);
    }
    console.log(result.data.length);
    this.cnt=result.data.length;
    if(this.cnt<this.pageSize){
      this.flag=false;
    }
  }
  下滑刷新函数
  doInfinite(infiniteScroll){
    setTimeout(() => {
      infiniteScroll.complete();
      this.httpService.get('/no/filter/app/query/bidding/list', {'pageNum':this.pageNum,'pageSize':this.pageSize }
      ).then(
        res => this.handleSuccess(res));
      if(!this.flag) {
        infiniteScroll.enable(false);
      }
    }, 2000);
  }
}
