import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the CloudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cloud',
  templateUrl: 'cloud.html',
})
export class CloudPage {
  showWhat;
  dataSource : Array <any> = [];
  divHeight : string = screen.width / 3 + 'px';
  constructor(public navCtrl: NavController, public navParams: NavParams,private app: App,private httpService: HttpService,public alertCtrl: AlertController) {
    var data11 = {'title':'基础数据', 'icon':'assets/ic_search.png', 'model': 0};
    var data12 = {'title':'采购管理', 'icon':'assets/ic_form.png', 'model': 1};
    // var data13 = {'title':'销售管理', 'icon':'assets/ic_approve.png', 'model': 2};
    var data21 = {'title':'入库管理', 'icon':'assets/ic_todeal.png', 'model': 3};
    // var data22 = {'title':'库存管理', 'icon':'assets/ic_todeal.png', 'model': 4};
    var data23 = {'title':'出库管理', 'icon':'assets/ic_todeal.png', 'model': 5};
    // var data31 = {'title':'结算管理', 'icon':'assets/ic_todeal.png', 'model': 6};
    // var data32 = {'title':'计划管理', 'icon':'assets/ic_todeal.png', 'model': 7};
    // var data33 = {'title':'数据管理', 'icon':'assets/ic_todeal.png', 'model': 8};
    // var data41 = {'title':'数据管理', 'icon':'assets/ic_todeal.png', 'model': 9};
    let rowDatas1 = [data11, data12, data21];
    let rowDatas2 = [data23];


    this.dataSource.push(rowDatas1);
    this.dataSource.push(rowDatas2);

  }

  onLogin() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("teamId");
    localStorage.removeItem("id");
    this.app.getRootNav().setRoot(LoginPage);
  }

  ngOnInit(): void {

  }

  ionViewDidLoad() {
    var show = localStorage.getItem("token");
    if (show) {
      this.showWhat = 1;
    } else {
      this.showWhat = 0;
    }

      let eles = document.getElementsByClassName('colClass');
      for (var i = 0; i < eles.length; i++) {
        let ele = eles[i] as HTMLElement;
        ele.style.height = this.divHeight;
        ele.style.width = this.divHeight;
      }

  }
  fShowConfirm(title, message, disagreeText, agreeText) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: disagreeText,
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: agreeText,
          handler: () => {
            this.app.getRootNav().push('GuidPage')
          }
        }
      ]
    });
    confirm.present();
  }
  itemTapped(model) {
    if(this.showWhat==0){
      var codeMessage="请登录/注册后再操作";
      this.fShowConfirm('Tips', codeMessage, '取消', '确定');
      // this.httpService.presentToast("请登录/注册后再操作")
    }else if(this.showWhat==1){
      if (model === 0) {
      this.app.getRootNav().push('BasicDataPage');
    }
    else if (model === 1) {
      this.app.getRootNav().push('PurchasingManagementPage');
    }
    else if (model === 2) {
      // this.app.getRootNav().push(ApprovalPage);
    } else if (model === 3) {
      this.navCtrl.push('StorageManagementPage');
    } else if (model === 4) {
    }
    else if (model === 5) {
      this.navCtrl.push('OutboundManagementPage');
    }
    }
  }
}
