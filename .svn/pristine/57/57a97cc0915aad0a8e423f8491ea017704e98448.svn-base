import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { ToastController } from 'ionic-angular';
import  { ForgetPasswordPage } from '../../pages/forget-password/forget-password';
import  { AgreementPage } from '../../pages/agreement/agreement';
import { HomePage } from '../home/home';
import { TabsPage } from '../../pages/tabs/tabs';
import { APP_SERVE_URL_TEST } from '../../service/Constants';

var sha1 = require('node-sha1');

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  logoWidth : string = screen.width + 'px';
  logoHeight : string = screen.width * 2 / 3 + 'px';
  userName : string;
  password : string;
  flagSrc : string = 'assets/icon_nolook.png';
  inFlag : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private httpService: HttpService, private menu : MenuController) {

  }

  ngOnInit(): void {
    var commit = document.getElementById('login_commit');
    var commitWith = screen.width - 30 + 'px';
    var text = "width:" + commitWith + ";background-color: white;color: #008ec3;border: 1px solid #008ec3;";
    commit.style.cssText = text;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }

  login() {
    console.log('test login');
    if(this.userName === '' || (typeof(this.userName)=="undefined")) {
      this.httpService.presentToast("用户名不能为空！");
      return;
    }

    if(this.password === '' || (typeof(this.password)=="undefined")) {
      this.httpService.presentToast("密码不能为空！");
      return;
    }

    var passw = sha1(this.password);
    var data = {'username': this.userName, 'password': passw};
    console.log(data);
    this.httpService.postBody('auth', data).then(res => this.handleSuccess(res));
  }

  private handleSuccess(result) {
    var token = result.token;
    if (typeof(token)=="undefined") {
      this.httpService.presentToast("用户名或密码错误！");
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("userName", this.userName);
    this.httpService.getWithHeader('user', {}).then(res => this.handleUserInfoSuccess(res));
  }

  private handleUserInfoSuccess(result) {
    console.log(result);
    var tenamtId = result.tenantId;
    var userName = result.username;
    var avatar = result.avatar;
    var id = result.id;
    if (typeof(tenamtId)=="undefined") {
      this.httpService.presentToast("个人信息获取失败！");
      return;
    }
    localStorage.setItem("teamId", tenamtId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("id", id);
    localStorage.setItem("avatar", APP_SERVE_URL_TEST + '/' + avatar);
    this.navCtrl.setRoot(TabsPage);
  }

  forgetPassw() {
    this.navCtrl.push(ForgetPasswordPage);
  }

  forwardAgreement() {
    this.navCtrl.push(AgreementPage);
  }

  showOrHidePassw() {
    console.log('click');
    alert(this.inFlag);
    this.inFlag = !this.inFlag;
    alert(this.flagSrc);
    if(this.inFlag) {
      this.flagSrc = 'assets/icon_nolook.png';
    } else {
      this.flagSrc = 'assets/icon_look.png';
    }
    alert(this.flagSrc);
  }
}
