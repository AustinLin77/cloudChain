import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomerManagePage } from '../customer-manage/customer-manage';
import { SupplierManagementPage } from '../supplier-management/supplier-management'
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

  dataSource : Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicDataPage');
    var data1 = {'key': '客户管理', 'index': '1'};
    this.dataSource.push(data1);
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

}
