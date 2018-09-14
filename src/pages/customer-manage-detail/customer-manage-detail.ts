import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import * as $ from "jquery";
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the CustomerManageDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-manage-detail',
  templateUrl: 'customer-manage-detail.html',
})
export class CustomerManageDetailPage {

  headerParameters: any;
  auditStatus: string = '-1';
  pageNum: number = 1;
  pageSize: number = 18;
  nextPage: number = 1;
  pages: number;
  dataSource1: any = {};
  data: any;
  showPage:string="baseMess";
  dataSource2: any = {};
  dataSource3: any = {};
  dataSource4: any = {};
  dataSource5: any = {};

  constructor(private httpService: HttpService, public navCtrl: NavController, public navParams: NavParams, private photoViewer: PhotoViewer){
    this.data = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerManageDetailPage');
    this.obtainDatas();
    $(".top button").on('click',function (e) {
      console.log(e);
      $(".top button").attr("style","");
      e.target.setAttribute("style","border-bottom: solid 3px #007aff;border-radius: 0;color:#007aff")
    })
  }

  showBigIcon(data) {
    console.log(data);
    this.photoViewer.show(data.copyPath, data.type);
  }

  showMess(showId){
      console.log(showId);
      this.showPage=showId
  }
  obtainDatas(){
    this.headerParameters = {
      id: this.data.id
    };
    console.log(this.data);
    var url = 'http://wmsapi.sunwoda.com/api/companys/app/detail/' + this.data.id;
    this.httpService.getUser(url, this.headerParameters).then(res => this.handleUserInfoSuccess(res));
  }

  handleUserInfoSuccess(result) {
    console.log(result);
    this.dataSource1 = result.data;
    this.dataSource2 = this.dataSource1.companyInfo;
    this.dataSource3 = this.dataSource1.address;
    this.dataSource4 = this.dataSource1.contact;
    this.dataSource5 = this.dataSource1.certificate;
  }
}
