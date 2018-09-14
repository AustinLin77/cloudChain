import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';


import * as $ from "jquery";
/**
 * Generated class for the GuidPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guid',
  templateUrl: 'guid.html',
})
export class GuidPage {

  logoWidth : string = screen.width + 'px';
  logoHeight : string = screen.height + 20 + 'px';


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var show=localStorage.getItem("token");
    console.log(show);
    $('#guid_main').on('touchmove',function(e){
      console.log(e);
      e.preventDefault();

    })
  }

  loginOrRegister(type) {
    if(type == 0) {
      this.navCtrl.push('LoginPage');
    } else {
      this.navCtrl.push('RegisterPage');
    }
  }
}
