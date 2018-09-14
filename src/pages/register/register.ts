import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import {LoginPage} from "../login/login";
import sha1 from 'node-sha1'
import * as $ from "jquery";
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  rlogoWidth : string = (screen.width - 30)+ 'px';
  rlogoHeight : string = '80px';
  industrys: any = [];
  industry: string = '请选择所属行业';
  operatingYears: any = [];
  operatingYear: string = '请选择经营年限';
  sizes: any = [];
  size: string = '请选择经营规模';
  companyName:string;
  step: number = 1;
  stepIcon: string = 'assets/imgs/1.png';
  codeMessage: string = '发送验证码';
  verifyCode1: string = '';
  tel1: string = '';
  count: number = 60;
  isDisabled : number = 0;
  vipName: string = '';
  vipNamePass: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterMainPage');
    $('#register_main').on('touchmove',function(e){
      console.log(e);
      e.preventDefault();
    })
    this.obtainDatas();
  }

  obtainDatas() {
    this.httpService.getUser('http://wmsapi.sunwoda.com/reg/basicInfo', {}).then(res => this.handleDatasSuccess(res));
  }

  private handleDatasSuccess(result) {
    var statusCode = result.statusCode;
    if (statusCode !== 200) {
      this.httpService.presentToast(result.message);
      return;
    }
    console.log(result);
    this.industrys = result.data.industry;
    this.operatingYears = result.data.operatingYears;
    this.sizes = result.data.size;
  }

  verifyCode(): void {
    if(this.isDisabled > 0) return;

    if(this.tel1 === '' || (typeof(this.tel1)=="undefined")) {
      this.httpService.presentToast('手机号不能为空！');
      return;
    }
    console.log('verifyCode');
    var codeMessage= '我们即将向 ' + this.tel1 + ' 发送短信验证码, 请检查手机号是否正确';
    this.showConfirm('短信验证码', codeMessage, '取消', '发送');
  }

  showConfirm(title, message, disagreeText, agreeText) {
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
            console.log(this.tel1)
            var data = {'phoneNum': this.tel1};
            var vCodeUrl = 'http://wmsapi.sunwoda.com/reg/sendVerifyCode';
            this.httpService.getUser(vCodeUrl, data).then(res => this.handleSuccess(res));
          }
        }
      ]
    });
    confirm.present();
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

  private handleSuccess(result) {
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
  //
  // private commitSuccess(result) {
  //   var statusCode = result.statusCode;
  //   if (statusCode !== 200) {
  //     this.httpService.presentToast(result.message);
  //     return;
  //   }
  // }

  nextStep(step) {
    let temp = 'assets/imgs/' + step + '.png';
    this.step = step;
    this.stepIcon = temp;
  }

  selectStep(type) {
    if(type == 0) { // 上一步
      this.step--
    } else { // 下一步  验证验证码
      if(this.step == 2) {
        if(this.tel1 === '') {
          this.httpService.presentToast('输入手机号');
          return;
        }
        if(this.verifyCode1 === '') {
          this.httpService.presentToast('输入手机验证码');
          return;
        }
        var data = {'verifyCode': this.verifyCode1};
        var codeUrl = 'http://wmsapi.sunwoda.com/reg/' + this.tel1 + '/' + this.verifyCode1;
        this.httpService.getUser(codeUrl, data).then(res => this.handleCodeSuccess(res));
      }
    }
    let temp = 'assets/imgs/' + this.step + '.png';
    this.stepIcon = temp;
  }

  handleCodeSuccess(result) {
    console.log(result);
    var statusCode = result.statusCode;
    if (statusCode !== 200) {
      this.httpService.presentToast(result.message);
      return;
    }
    this.step = 3;
    let temp = 'assets/imgs/' + this.step + '.png';
    this.stepIcon = temp;
  }

  jump() {
    if(!this.companyName){
      this.httpService.presentToast("请填写公司名称")
    }else{
      this.step = 2;
      let temp = 'assets/imgs/' + this.step + '.png';
      this.stepIcon = temp;
    }
  }

  commitRegisterInfo() {
    // reg/saveRegInfo
    var industry = this.industry === '请选择所属行业' ? '' : this.industry;
    var operatingYears = this.operatingYears === '请选择经营年限' ? '': this.operatingYears;
    var enterpriseScale = this.size === '请选择经营规模' ? '' : this.size;
    var shaPass = sha1(this.vipNamePass);

    var data = {'industry': industry, 'operatingYears': this.operatingYear,
                'enterpriseScale': enterpriseScale, 'phoneNum': this.tel1, 'captcha': this.verifyCode1,
                'userName': this.vipName, 'password': shaPass,'companyName':this.companyName};
    var codeUrl = 'http://wmsapi.sunwoda.com/reg/saveRegInfo';
    this.httpService.postWithHeadersNew(codeUrl, data).then(res => this.handleCommitSuccess(res));
  }

  handleCommitSuccess(result) {
    console.log(result);
    var statusCode = result.statusCode;
    this.httpService.presentToast(result.message);
    if (statusCode !== 200) {
      return;
    }
    this.navCtrl.push('GuidPage');
  }
}
