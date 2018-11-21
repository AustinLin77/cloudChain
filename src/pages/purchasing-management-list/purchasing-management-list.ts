import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as $ from "jquery";
import { PurchasingManagementListDetailPage } from '../../pages/purchasing-management-list-detail/purchasing-management-list-detail';
import { Component,ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';

/**
 * Generated class for the PurchasingManagementListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchasing-management-list',
  templateUrl: 'purchasing-management-list.html',
})

export class PurchasingManagementListPage {
  @ViewChild(Navbar) navBar: Navbar;
  unread:number=0;
  headerParameters: any;
  auditStatus: string = '1';
  pageNum: number = 1;
  pageSize: number = 18;
  nextPage: number = 1;
  pages: number;
  dataSource: any = [];
  dataSource1: any = [];
  already:string='true';
  unready:string='false';
  dataSource2: any = [];
  showSearch:string='false';
  flag:number=0;
  myInput: string = '';
  showSearchLoaction="false";
  searchLoactionData:any=["东莞李威","小米科技有限公司","石龙仔市场"];
  cancelOrSearch: number = 1;

  constructor(private httpService: HttpService, public navCtrl: NavController,
              public navParams: NavParams, public alertCtrl: AlertController,
              private photoViewer: PhotoViewer, public events: Events) {
    events.subscribe('pop:myUnread', (number)=>{
      console.log(number);
      this.unread = number;
    })
    events.subscribe('pop:data:pml', (data, time) => {

      console.log('OutboundManagementListPage pop data');
      console.log(data);
      // this.obtainDatas();
      console.log(this.dataSource1.length);
      this.removeDatas(data);
    });
  }

  removeDatas(data) {
    for (var i = 0; i < this.dataSource1.length; i++) {
      if(this.dataSource1[i].id === data.id) {
        this.dataSource1.splice(i, 1);
        break;
      }
    }
  }

  getItems() {
    if(this.myInput !== '') {
      this.showSearchLoaction = 'false';
    }
    console.log(this.myInput);
    this.obtainDatas();
  }

  onCancelOrSearch(type) {
    this.cancelOrSearch = type;
    console.log(type);

    if(type == 0) {
      this.showSearchLoaction="true";
      this.showSearch='true';
    } else {
      this.myInput = '';
      this.showSearchLoaction="false";
      this.showSearch='false';
      this.obtainDatas();
    }
  }

  itemTapped($event, data) {
    console.log(data);
    this.navCtrl.push('PurchasingManagementListDetailPage', {'data': data, 'type': this.auditStatus});
  }

  obtainDatas(){
    this.headerParameters = {
      status: this. auditStatus,
      pageNum:this.nextPage,
      pageSize: this.pageSize
    };
    if(this.myInput !== '') {
      this.headerParameters['orderNumber'] = this.myInput;
    }

    this.httpService.getUser('https://wmsapi.sunwoda.com/api/purchase/reqPurchase/app/bill', this.headerParameters).then(res => this.handleUserInfoSuccess(res));
  }

  onPageTypeChange(type) {
    console.log(type);
    if(type=='1'){
      this.already='true';
      this.unready='false';
    }else{
      this.already='false';
      this.unready='true';
    }
    this.auditStatus = type;
    this.obtainDatas();
  }
  backButtonClick = (e: UIEvent) => {

    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad CustomerManagePage');
    this.unread = this.navParams.data.unread;
    this.obtainDatas();
    // $(".ready button").on('click',function (e) {
    //   console.log(e);
    //   $(".ready button").attr("style","");
    //   e.target.setAttribute("style","border-bottom: solid 3px #007aff;")
    // })
  }

  showSe(e){
    console.log(e);
    this.flag++;
    if(this.flag%2==1){
      this.showSearch='true';
      this.showSearchLoaction="true";
      e.target.parentNode.innerHTML="取消"
    }
    else {
      this.showSearchLoaction="false";
      this.showSearch='false';
      e.target.innerHTML='<img src="assets/ic_search.png"/>';
      this.myInput = '';
      this.obtainDatas();
    }
  }
  onCancel(){
    console.log("aaa");
    this.showSearchLoaction="true";
  }
  setSearch(data){
    this.myInput=data;
    this.getItems();
    this.showSearchLoaction="false"
  }
  removeSearch (index){
    console.log(index);
    this.searchLoactionData.splice(index,1)
  }
  handleUserInfoSuccess(result) {
    console.log(result);
    if(this.auditStatus === '1') {
      this.dataSource1 = result.data;
      console.log(this.dataSource1);
    } else {
      this.dataSource1 = result.data;
      console.log(this.dataSource2);
    }
  }
}
