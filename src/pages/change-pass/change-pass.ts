import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';

// var sha1 = require('node-sha1');
import sha1 from 'node-sha1'

/**
 * Generated class for the ChangePassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {

  newPassword: string = '';
  tel: string = '';
  uName: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePassPage');
    this.tel = this.navParams.get('tel');
    this.uName = this.navParams.get('uName');

    var commit = document.getElementById('change_commit');
    var commitWith = screen.width - 30 + 'px';
    var text = "width:" + commitWith + ";background-color: white;color: #008ec3;border: 1px solid #008ec3;";
    commit.style.cssText = text;
  }

  cCommit() {
    console.log('commit');
    // api/users/app/update
    var verUrl = 'https://wmsapi.sunwoda.com/api/users/app/update';
    var newPassword = sha1(this.newPassword);
    var data = {'telephone': this.tel, 'password': newPassword, 'username': this.uName};
    this.httpService.putWithHeadersServes(verUrl, data).then(res => this.handleCommitSuccess(res));
  }

  private handleCommitSuccess(result) {
    var statusCode = result.statusCode;
    if (statusCode !== 200) {
      this.httpService.presentToast(result.message);
      return;
    }
    this.navCtrl.push('GuidPage')
  }
}
