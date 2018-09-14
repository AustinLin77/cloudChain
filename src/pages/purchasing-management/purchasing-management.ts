import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 import { PurchasingManagementListPage } from '../../pages/purchasing-management-list/purchasing-management-list';

/**
 * Generated class for the PurchasingManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchasing-management',
  templateUrl: 'purchasing-management.html',
})

export class PurchasingManagementPage {


  dataSource : Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicDataPage');
    var data1 = {'key': '请购单据', 'index': '1'};
    this.dataSource.push(data1);
  }

  itemTapped(e, item) {
    console.log(item);
    if(item.index === '1') {

      this.navCtrl.push('PurchasingManagementListPage');
    }
  }
}
