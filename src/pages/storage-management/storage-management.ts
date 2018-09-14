import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageDocumentsPage } from '../../pages/storage-documents/storage-documents';

/**
 * Generated class for the StorageManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storage-management',
  templateUrl: 'storage-management.html',
})
export class StorageManagementPage {


  dataSource : Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicDataPage');
    var data1 = {'key': '入库单据', 'index': '1'};
    this.dataSource.push(data1);
  }

  itemTapped(e, item) {
    console.log(item);
    if(item.index === '1') {
      this.navCtrl.push('StorageDocumentsPage');
    }
  }
}
