import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ActionSheetController, Events} from 'ionic-angular';
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
  unread:number=0;
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
  showApproval: number = 0;
  type: string;
  constructor(private httpService: HttpService, public navCtrl: NavController, public navParams: NavParams, private photoViewer: PhotoViewer,
  public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public events: Events){
    this.data = navParams.get('data');
    this.type = navParams.get('type').auditStatus;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerManageDetailPage');
    this.obtainDatas();
    $(".top button").on('click',function (e) {
      console.log(e);
      $(".top button").attr("style","");
      e.target.setAttribute("style","border-bottom: solid 3px deepskyblue;border-radius: 0;color:#007aff")
    })
    console.log(this.type)
    this.showApproval = this.type == '-1' ? 0 : 1;
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
    var url = 'https://wmsapi.sunwoda.com/api/companys/app/detail/' + this.data.id;
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


  passOrRefuse(type, advise) {

    var url = 'https://wmsapi.sunwoda.com/api/companys/app/approval/' + this.data.id + '/' + type;
    this.httpService.putWithHeadersServes(url, {}).then(res => this.handleApprovalSuccess(res));
  }

  handleApprovalSuccess(result) {
    console.log(result);
    var statusCode = result.statusCode;
    this.httpService.presentToast(result.message);
    if (statusCode !== 200) {
      return;
    }
    console.log('handleApprovalSuccess pop remove data!')
    var headerParameters={
      auditStatus:'1'
    }
    this.httpService.getUser('https://wmsapi.sunwoda.com/api/companys/app/get', headerParameters).then(res => this.handleMyInfoSuccess(res));
    // this.events.publish('pop:myUnread',this.unread, Date.now());
    // this.events.publish('pop:data',this.data, Date.now());
    console.log(this.data)
    // this.navCtrl.pop();
  }
  handleMyInfoSuccess(res){
    console.log(res);
    this.unread=res.total;
    this.events.publish('pop:myUnread',this.unread, Date.now());
    this.events.publish('pop:data',this.data, Date.now());
    this.navCtrl.pop();
  }
  approval() {
    this.presentActionSheet();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '通过',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.passOrRefuse(1, '');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
