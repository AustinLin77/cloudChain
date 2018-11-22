
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Events } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import * as $ from "jquery";
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { Component,ViewChild } from '@angular/core';

import { Navbar } from 'ionic-angular';
/**
 * Generated class for the OutboundManagementListDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-outbound-management-list-detail',
  templateUrl: 'outbound-management-list-detail.html',
})

export class OutboundManagementListDetailPage {
  @ViewChild(Navbar) navBar: Navbar;
  headerParameters: any;
  auditStatus: string = '-1';
  pageNum: number = 1;
  pageSize: number = 18;
  nextPage: number = 1;
  pages: number;
  unread:number=0;
  dataSource: any = [];
  data: any;
  showPage:string="baseMess";
  showApproval: number = 0;
  type: string;

  constructor(private httpService: HttpService, public navCtrl: NavController,
              public navParams: NavParams, private photoViewer: PhotoViewer,
              public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public events: Events){
    this.data = navParams.get('data');
    this.type = navParams.get('type');
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad CustomerManageDetailPage');
    this.obtainDatas();
    $(".top button").on('click',function (e) {
      console.log(e);
      $(".top button").attr("style","");
      e.target.setAttribute("style","border-bottom: solid 3px #007aff;border-radius: 0;color:#007aff")
    })

    this.showApproval = this.type == '0' ? 0 : 1;
  }
  backButtonClick = (e: UIEvent) => {
    // var data= 3;
    // this.events.publish('pop:myUnread',data, Date.now());
    this.navCtrl.pop();
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
    var url = 'https://wmsapi.sunwoda.com/api/outbound/bill/headers/app/detailLines/' + this.data.id;
    this.httpService.getUser(url, this.headerParameters).then(res => this.handleUserInfoSuccess(res));
  }

  handleUserInfoSuccess(result) {
    console.log(result);
    var statusCode = result.statusCode;
    if (!(statusCode === 200 || statusCode === 10013)) {
      this.httpService.presentToast(result.message);
      return;
    }
    this.dataSource = result.data;
    console.log(this.dataSource);

    if (statusCode === 10013) {
      this.showConfirm(result.message);
      this.showApproval = 1;
    }
  }

  showConfirm(msg) {
    let confirm = this.alertCtrl.create({
      title: '确定查看',
      message: msg,
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
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
            this.passOrRefuse(3, '');
          }
        },{
          text: '驳回',
          handler: () => {
            console.log('Archive clicked');
            this.showPrompt(2);
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

  showPrompt(type) {
    let prompt = this.alertCtrl.create({
      title: '请输入驳回原因',
      message: "",
      inputs: [
        {
          name: '输简要说明驳回原因',
          placeholder: '输简要说明驳回原因'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            console.log('Saved clicked');
            this.passOrRefuse(type, data['输简要说明驳回原因']);
          }
        }
      ]
    });
    prompt.present();
  }

  passOrRefuse(type, advise) {
    this.headerParameters = {
      status: type,
      approvalConments: advise
    };
    var url = 'https://wmsapi.sunwoda.com/api/outbound/bill/headers/app/approval/' + this.data.id;
    this.httpService.putWithHeadersServes(url, this.headerParameters).then(res => this.handleApprovalSuccess(res));
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
      status:'0'
    }
    this.httpService.getUser('https://wmsapi.sunwoda.com/api/outbound/bill/headers/app/bill', headerParameters).then(res => this.handleMyInfoSuccess(res));
    // this.events.publish('pop:myUnread',this.unread, Date.now());
    // this.events.publish('pop:data',this.data, Date.now());
    console.log(this.data)
    // this.navCtrl.pop();
  }
  handleMyInfoSuccess(res){
    console.log(res.total)
    this.unread=res.total
    this.events.publish('pop:myUnread',this.unread, Date.now());
    this.events.publish('pop:data',this.data, Date.now());
    this.navCtrl.pop();
  }
}
