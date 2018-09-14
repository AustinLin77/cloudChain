import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { ChangePassPage } from '../../pages/change-pass/change-pass';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  codeMessage: string = '发送验证码';
  verifyCode1: string = '';
  tel1: string = '';
  count: number = 60;
  isDisabled : number = 0;
  fUsername: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
    var commit = document.getElementById('f_commit');
    var commitWith = screen.width - 30 + 'px';
    var text = "width:" + commitWith + ";background-color: white;color: #008ec3;border: 1px solid #008ec3;";
    commit.style.cssText = text;
  }

  // 下一步
  fCommit() {

    var verUrl = 'api/users/valid/' + this.verifyCode1;
    var data = {'telephone': this.tel1};
    this.httpService.putWithHeaders(verUrl, data).then(res => this.handleCommitSuccess(res));
  }

  private handleCommitSuccess(result) {
    var statusCode = result.statusCode;
    if (statusCode !== 200) {
      this.httpService.presentToast(result.message);
      return;
    }
    this.navCtrl.push(ChangePassPage, {'tel': this.tel1, 'uName': this.fUsername});
  }

  fVerifyCode(): void {
    if(this.isDisabled > 0) return;

    if(this.tel1 === '' || (typeof(this.tel1)=="undefined")) {
      this.httpService.presentToast('手机号不能为空！');
      return;
    }
    console.log('verifyCode');
    var codeMessage= '我们即将向 ' + this.tel1 + ' 发送短信验证码, 请检查手机号是否正确';
    this.fShowConfirm('短信验证码', codeMessage, '取消', '发送');
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
            console.log('Agree clicked');
            var data = {'mobilePhone': this.tel1, 'loginName': this.fUsername};
            var vCodeUrl = 'api/users/getValidCode'
            this.httpService.postWithHeaders(vCodeUrl, data).then(res => this.handleCodeSuccess(res));
          }
        }
      ]
    });
    confirm.present();
  }

  private handleCodeSuccess(result) {
    this.httpService.presentToast(result.message);
    var statusCode = result.statusCode;
    if (statusCode !== 200) {
      this.httpService.presentToast(result.message);
      return;
    }
    this.codeMessage = '倒计时 ' + this.count + ' 秒';
    this.isDisabled = 1;
    setInterval(() => {
      this.countDown(this);
    }, 1000);
  }

  countDown(t) {
    if (this.count > 0) {
      this.count--;
      this.codeMessage = '倒计时 ' + this.count + ' 秒';
      console.log(this.codeMessage);

    } else {
      clearTimeout(t);
      this.codeMessage = '获取验证码';
      this.isDisabled = 0;
    }
  }

  // private handleSuccess(result) {
  //   this.httpService.presentToast(result.message);
  //   var statusCode = result.statusCode;
  //   if (statusCode !== 200) {
  //     this.httpService.presentToast(result.message);
  //     return;
  //   }
  //   this.codeMessage = '倒计时 ' + this.count + ' 秒';
  //   this.isDisabled = 1;
  //   setInterval(() => {
  //     this.countDown(this);
  //   }, 1000);
  // }

}
