import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OutboundManagementListPage } from '../outbound-management-list/outbound-management-list';

/**
 * Generated class for the OutboundManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-outbound-management',
  templateUrl: 'outbound-management.html',
})

export class OutboundManagementPage {


  dataSource : Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicDataPage');
    var data1 = {'key': '出库单据', 'index': '1'};
    this.dataSource.push(data1);
  }

  itemTapped(e, item) {
    console.log(item);
    if(item.index === '1') {
      this.navCtrl.push('OutboundManagementListPage');
    }
  }
}
