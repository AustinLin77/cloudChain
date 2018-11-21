import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { CustomerManagePage } from '../customer-manage/customer-manage';
import { SupplierManagementPage } from '../supplier-management/supplier-management';
import { HttpService } from '../../service/HttpService';
/**
 * Generated class for the BasicDataPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basic-data',
  templateUrl: 'basic-data.html',
})
export class BasicDataPage {
  chain:'';
  dataSource : Array<any> = [];
  unread:number=0;
  constructor(private httpService: HttpService,public navCtrl: NavController, public navParams: NavParams, public events: Events) {
   events.subscribe('pop:myUnread', (number)=>{
      console.log(number);
      this.unread = number;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicDataPage');
    var data1 = {'key': '客户管理', 'index': '1'};
    this.chain=localStorage.getItem('chain')
    this.dataSource.push(data1);
    var headerParameters = {
      auditStatus: '1',
    };
    this.httpService.getUser('https://wmsapi.sunwoda.com/api/companys/app/get',headerParameters).then(res => this.handleUserInfoSuccess(res));
  }

  itemTapped(e, item) {
    console.log(item);
    if(item.index === '1') {
     this.navCtrl.push('CustomerManagePage');

    } else if(item.index === '2') {
       this.navCtrl.push('SupplierManagementPage');
    } else if(item.index === '3') {

    }
  }
  handleUserInfoSuccess(res){
    console.log(res);
    this.unread=res.total
  }
}
