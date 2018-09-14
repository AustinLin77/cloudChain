import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as $ from "jquery";
import { CustomerManageDetailPage } from '../../pages/customer-manage-detail/customer-manage-detail';
import { StorageDocumentsDetailPage } from '../../pages/storage-documents-detail/storage-documents-detail';

/**
 * Generated class for the StorageDocumentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storage-documents',
  templateUrl: 'storage-documents.html',
})

export class StorageDocumentsPage {

  headerParameters: any;
  auditStatus: string = '1';
  pageNum: number = 1;
  pageSize: number = 18;
  nextPage: number = 1;
  pages: number;
  dataSource: any = [];
  dataSource1: any = [];
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

    events.subscribe('pop:data', (data, time) => {

      console.log('StorageDocumentsPage pop data');
      console.log(data);
      // this.obtainDatas();
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
    this.navCtrl.push('StorageDocumentsDetailPage', {'data': data, 'type': this.auditStatus});
  }

  obtainDatas(){
    this.headerParameters = {
      status: this. auditStatus,
      pageNum:this.nextPage,
      pageSize: this.pageSize
    };
    if(this.myInput !== '') {
      this.headerParameters['billCode'] = this.myInput;
    }

    this.httpService.getUser('http://wmsapi.sunwoda.com/api/inbound/bill/headers/app/bill', this.headerParameters).then(res => this.handleUserInfoSuccess(res));
  }

  onPageTypeChange(type) {
    console.log(type);
    this.auditStatus = type;
    this.obtainDatas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerManagePage');
    this.obtainDatas();
    $(".ready button").on('click',function (e) {
      console.log(e);
      $(".ready button").attr("style","");
      e.target.setAttribute("style","border-bottom: solid 3px #007aff;")
    })
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