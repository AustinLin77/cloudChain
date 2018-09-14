var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ForgetPasswordPage = (function () {
    function ForgetPasswordPage(navCtrl, navParams, httpService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.alertCtrl = alertCtrl;
        this.codeMessage = '获取验证码';
        this.count = 60;
        this.isDisabled = 0;
    }
    ForgetPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPasswordPage');
    };
    ForgetPasswordPage.prototype.ngOnInit = function () {
        var commit1 = document.getElementById('commit1');
        var commitWith = screen.width - 30 + 'px';
        var text = "width:" + commitWith + ";background-color: #008ec3;";
        commit1.style.cssText = text;
    };
    ForgetPasswordPage.prototype.verifyCode = function () {
        if (this.userName1 === '' || (typeof (this.userName1) == "undefined")) {
            this.httpService.presentToast('用户名不能为空！');
            return;
        }
        if (this.tel1 === '' || (typeof (this.tel1) == "undefined")) {
            this.httpService.presentToast('手机号不能为空！');
            return;
        }
        var message = '我们即将向 ' + this.tel1 + ' 发送短信验证码, 请检查手机号是否正确';
        this.showConfirm('短信验证码', message, '取消', '发送');
    };
    ForgetPasswordPage.prototype.commit1 = function () {
        if (this.userName1 === '' || (typeof (this.userName1) == "undefined")) {
            this.httpService.presentToast('用户名不能为空！');
            return;
        }
        if (this.tel1 === '' || (typeof (this.tel1) == "undefined")) {
            this.httpService.presentToast('手机号不能为空！');
            return;
        }
        if (this.verCode1 === '' || (typeof (this.verCode1) == "undefined")) {
            this.httpService.presentToast('验证码不能为空！');
            return;
        }
        if (this.password1 === '' || (typeof (this.password1) == "undefined")) {
            this.httpService.presentToast('新密码不能为空！');
            return;
        }
    };
    ForgetPasswordPage.prototype.showConfirm = function (title, message, disagreeText, agreeText) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: disagreeText,
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: agreeText,
                    handler: function () {
                        console.log('Agree clicked');
                        var data = { 'loginName': _this.userName1, 'mobilePhone': _this.tel1 };
                        _this.httpService.postBody('api/users/getValidCode', data).then(function (res) { return _this.handleSuccess(res); });
                    }
                }
            ]
        });
        confirm.present();
    };
    ForgetPasswordPage.prototype.countDown = function (t) {
        if (this.count > 0) {
            this.count--;
            this.codeMessage = '倒计时 ' + this.count + ' 秒';
            console.log(this.codeMessage);
        }
        else {
            clearTimeout(t);
            this.codeMessage = '获取验证码';
            this.isDisabled = 0;
        }
    };
    ForgetPasswordPage.prototype.handleSuccess = function (result) {
        var _this = this;
        var statusCode = result.statusCode;
        if (statusCode !== 200) {
            this.httpService.presentToast(result.message);
            return;
        }
        this.codeMessage = '倒计时 ' + this.count + ' 秒';
        setInterval(function () {
            _this.countDown(_this);
        }, 1000);
    };
    return ForgetPasswordPage;
}());
ForgetPasswordPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-forget-password',
        templateUrl: 'forget-password.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, HttpService, AlertController])
], ForgetPasswordPage);
export { ForgetPasswordPage };
//# sourceMappingURL=forget-password.js.map