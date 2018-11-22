import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import { OutboundManagementListPage } from '../outbound-management-list/outbound-management-list';
import { HttpService } from '../../service/HttpService';
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
  chain;
  unread:number=0;
  dataSource : Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,private httpService: HttpService, ) {
    events.subscribe('pop:myUnread', (number)=>{
      console.log(number);
      this.unread = number;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicDataPage');
    var data1 = {'key': '出库单据', 'index': '1'};
    this.chain=localStorage.getItem("chain")
    this.dataSource.push(data1);
    var headerParameters={
      status:'0'
    }
    this.httpService.getUser('https://wmsapi.sunwoda.com/api/outbound/bill/headers/app/bill', headerParameters).then(res => this.handleMyInfoSuccess(res));
  }

  itemTapped(e, item) {
    console.log(item);
    if(item.index === '1') {
      this.navCtrl.push('OutboundManagementListPage',{unread:this.unread});
    }
  }
  handleMyInfoSuccess(res){
    console.log(res.total);
    this.unread=res.total
  }
}
