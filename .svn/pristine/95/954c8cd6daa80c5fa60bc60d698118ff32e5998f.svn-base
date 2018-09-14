var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { APP_SERVE_URL_TEST } from "./Constants";
var HttpService = (function () {
    function HttpService(http, toastCtrl, alertCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
    }
    HttpService.prototype.get = function (url, paramObj) {
        var _this = this;
        url = APP_SERVE_URL_TEST + url;
        return this.http.get(url + this.toQueryString(paramObj))
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res.json()); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HttpService.prototype.getWithHeader = function (url, paramObj) {
        var _this = this;
        url = APP_SERVE_URL_TEST + url;
        var authorization = 'Bearer ' + localStorage.getItem("token");
        var headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': authorization });
        return this.http.get(url, new RequestOptions({ headers: headers }))
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res.json()); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HttpService.prototype.post = function (url, paramObj) {
        var _this = this;
        url = APP_SERVE_URL_TEST + url;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(url, this.toBodyString(paramObj), new RequestOptions({ headers: headers }))
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res.json()); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HttpService.prototype.postBody = function (url, paramObj) {
        var _this = this;
        url = APP_SERVE_URL_TEST + url;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(url, paramObj, new RequestOptions({ headers: headers }))
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res.json()); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HttpService.prototype.postWithHeaders = function (url, paramObj) {
        var _this = this;
        url = APP_SERVE_URL_TEST + url;
        var authorization = 'Bearer ' + localStorage.getItem("token");
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(url, paramObj, new RequestOptions({ headers: headers }))
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res.json()); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HttpService.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 1500,
        });
        toast.present();
    };
    HttpService.prototype.handleSuccess = function (result) {
        if (result['statusCode'] !== 0) {
            // alert(result.message);//这里使用ToastController
            this.presentToast(result.message);
        }
        return result;
    };
    HttpService.prototype.handleError = function (error) {
        var msg = '请求失败';
        if (error.status == 0) {
            msg = '请求地址错误';
        }
        if (error.status == 400) {
            msg = '请求无效';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在';
            console.error(msg + '，请检查路径是否正确');
        }
        console.log(error);
        var body = JSON.parse(error._body);
        this.presentToast(body.message);
        return error._body;
    };
    /**
     * @param obj　参数对象
     * @return {string}　参数字符串
     * @example
     *  声明: var obj= {'name':'小军',age:23};
     *  调用: toQueryString(obj);
     *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
     */
    HttpService.prototype.toQueryString = function (obj) {
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor == Array) {
                var queryValues = [];
                for (var i = 0, len = values.length, value = void 0; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            }
            else {
                ret.push(this.toQueryPair(key, values));
            }
        }
        return '?' + ret.join('&');
    };
    /**
     *
     * @param obj
     * @return {string}
     *  声明: var obj= {'name':'小军',age:23};
     *  调用: toQueryString(obj);
     *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
     */
    HttpService.prototype.toBodyString = function (obj) {
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor == Array) {
                var queryValues = [];
                for (var i = 0, len = values.length, value = void 0; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            }
            else {
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    };
    HttpService.prototype.toQueryPair = function (key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    };
    return HttpService;
}());
HttpService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ToastController, AlertController])
], HttpService);
export { HttpService };
//# sourceMappingURL=HttpService.js.map