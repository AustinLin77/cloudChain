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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { ToastController } from 'ionic-angular';
import { ForgetPasswordPage } from '../../pages/forget-password/forget-password';
var sha1 = require('node-sha1');
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, toastCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.httpService = httpService;
        this.logoWidth = screen.width + 'px';
        this.logoHeight = screen.width * 2 / 3 + 'px';
        this.flagSrc = 'assets/icon_nolook.png';
        this.inFlag = true;
    }
    LoginPage.prototype.ngOnInit = function () {
        var commit = document.getElementById('commit');
        var commitWith = screen.width - 30 + 'px';
        var text = "width:" + commitWith + ";background-color: #008ec3;";
        commit.style.cssText = text;
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        console.log('test login');
        if (this.userName === '' || (typeof (this.userName) == "undefined")) {
            this.httpService.presentToast("用户名不能为空！");
            return;
        }
        if (this.password === '' || (typeof (this.password) == "undefined")) {
            this.httpService.presentToast("密码不能为空！");
            return;
        }
        // var passw = sha1(this.password);
        var passw;
        var data = { 'username': this.userName, 'password': passw };
        console.log(data);
        this.httpService.postBody('auth', data).then(function (res) { return _this.handleSuccess(res); });
    };
    LoginPage.prototype.handleSuccess = function (result) {
        var _this = this;
        var token = result.token;
        if (typeof (token) == "undefined") {
            this.httpService.presentToast("用户名或密码错误！");
            return;
        }
        localStorage.setItem("token", token);
        localStorage.setItem("userName", this.userName);
        this.httpService.getWithHeader('user', {}).then(function (res) { return _this.handleUserInfoSuccess(res); });
    };
    LoginPage.prototype.handleUserInfoSuccess = function (result) {
        console.log(result);
        var tenamtId = result.tenantId;
        var userName = result.username;
        if (typeof (tenamtId) == "undefined") {
            this.httpService.presentToast("个人信息获取失败！");
            return;
        }
        localStorage.setItem("teamId", tenamtId);
        localStorage.setItem("userName", userName);
    };
    LoginPage.prototype.forgetPassw = function () {
        this.navCtrl.push(ForgetPasswordPage);
    };
    LoginPage.prototype.showOrHidePassw = function () {
        console.log('click');
        this.inFlag = !this.inFlag;
        if (this.inFlag) {
            this.flagSrc = 'assets/icon_nolook.png';
        }
        else {
            this.flagSrc = 'assets/icon_look.png';
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ToastController, HttpService])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map