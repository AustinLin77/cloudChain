import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Events  } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { ChangePassPage } from '../change-pass/change-pass';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
 import { CustomerManageDetailPage } from '../../pages/customer-manage-detail/customer-manage-detail';
// import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as $ from 'jquery/dist/jquery.js';
/**
 * Generated class for the CustomerManagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-manage',
  templateUrl: 'customer-manage.html',
})
export class CustomerManagePage {
  @ViewChild(Navbar) navBar: Navbar;
  headerParameters: any;
  auditStatus: string = '-1';
  pageNum: number = 1;
  pageSize: number = 18;
  nextPage: number = 1;
  pages: number;
  dataSource: any = [];
  showNoContent:boolean=false;
  already:string='true';
  unready:string='false';
  tab1: any = ChangePassPage;
  tab2: any = ForgetPasswordPage;
  dataSource1: any = [];
  dataSource2: any = [];
  showSearch:string='false';
  flag:number=0;
  unread:number=0;
  myInput: string = '';
  showSearchLoaction="false";
  searchLoactionData:any=["东莞李威","小米科技有限公司","石龙仔市场"];
  cancelOrSearch: number = 1;

  constructor( public events: Events,private httpService: HttpService, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              // private photoViewer: PhotoViewer
  ) {
    events.subscribe('pop:myUnread', (number)=>{
      console.log(number);
      this.unread = number;
      if(this.unread==0){
        this.showNoContent=true
      }
    })
    events.subscribe('pop:data', (data, time) => {

      console.log('OutboundManagementListPage pop data');
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
    this.auditStatus=data;
    console.log(data);
    this.navCtrl.push('CustomerManageDetailPage', {'data': data,'type': this.auditStatus});
  }

  obtainDatas(){
    this.headerParameters = {
      auditStatus: this. auditStatus,
      pageNum:this.nextPage,
      pageSize: this.pageSize
    };
    if(this.myInput !== '') {
      this.headerParameters['name'] = this.myInput;
    }

    this.httpService.getUser('https://wmsapi.sunwoda.com/api/companys/app/get', this.headerParameters).then(res => this.handleUserInfoSuccess(res));
  }

  onPageTypeChange(type) {
    this.showNoContent=false;
    console.log(type);
    this.auditStatus = type;
    if(type=='-1'){
      this.already='true';
      this.unready='false';
    }else{
      this.already='false';
      this.unready='true';
    }
    this.obtainDatas();
  }
  backButtonClick = (e: UIEvent) => {
    // var data= 3;
    this.events.publish('pop:myUnread',this.unread, Date.now());
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad CustomerManagePage');
    this.obtainDatas();
    var headerParameters = {
      auditStatus: '1',
    };
    this.httpService.getUser('https://wmsapi.sunwoda.com/api/companys/app/get',headerParameters).then(res => this.handleMyInfoSuccess(res));
    // $(".ready button").on('click',function (e) {
    //   console.log(e);
    //   $(".ready button").attr("style","");
    //   e.target.setAttribute("style","border-bottom: solid 3px #007aff;")
    // })
  }

  // onQueryChange() {
  //   console.log(this.);
  // }

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

      // $(".ready button").on('click',function (e) {
      //   console.log(e);
      //   $(".ready button").attr("style","");
      //   e.target.setAttribute("style","border-bottom: solid 3px #007aff;")
      // })
    }

}
  handleMyInfoSuccess(res){
  this.unread=res.total
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
    if(result.data.length==0){
      this.showNoContent=true
    }
    if(this.auditStatus === '-1') {
      this.dataSource1 = result.data;
      console.log(this.dataSource1);
    } else {
      this.dataSource1 = result.data;
      console.log(this.dataSource2);
    }
  }
}
