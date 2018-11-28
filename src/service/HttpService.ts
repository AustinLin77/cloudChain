import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController,App} from 'ionic-angular';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { APP_SERVE_URL_TEST } from "./Constants";

@Injectable()
export class HttpService {

  loading;
  myloading;
  constructor(private http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController, public loadCtrl: LoadingController,private app : App,) {
  }
  loadingStart(){
    this.myloading = this.loadCtrl.create({
      content:'正在加载...'
    });
    this.myloading.present();
    setTimeout(() => {
      this.hideLoading();
    }, 350);
  }

  hideLoading(){
    this.myloading.dismiss()
  }
  public get(url: string, paramObj: any) {
    url = APP_SERVE_URL_TEST+ url;
    console.log(url);
    console.log(paramObj);
    // this.loadingStart();
    return this.http.get(url + this.toQueryString(paramObj))
      .toPromise( )
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));

  }

  public getSort(url: string, paramObj: any) {
    url = APP_SERVE_URL_TEST+ url;
    console.log(url);
    console.log(paramObj);
    this.myloading = this.loadCtrl.create({
      content:'loading'
    });
    this.myloading.present();
    return this.http.get(url + this.toQueryString(paramObj))
      .toPromise( )
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));

  }

  public getWithHeader(url: string, paramObj: any) {
     url = APP_SERVE_URL_TEST +url + this.toQueryString(paramObj);
    var authorization = 'Bearer ' + localStorage.getItem("token");
    var teamId = localStorage.getItem("teamId");
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': authorization, 'X-TenantId':teamId, "Prefer-Lang":"zh-CN","Accept": "application/json", "X-Logined-Sign": "","X-UserId": "", });
    console.log(headers);
    console.log(url);
    console.log(paramObj);
    return this.http.get(url, new RequestOptions({headers: headers}),)
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }
  public getUser(url: string, paramObj: any) {
    url =url + this.toQueryString(paramObj);
    var authorization = 'Bearer ' + localStorage.getItem("token");
    var teamId = localStorage.getItem("teamId");
    var userName= localStorage.getItem("userName");
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': authorization, 'X-TenantId':teamId, "Prefer-Lang":"zh-CN","Accept": "application/json", "X-Logined-Sign": userName,"X-UserId": "", });
    console.log(headers);
    console.log(url);
    console.log(paramObj);
    return this.http.get(url, new RequestOptions({headers: headers}),)
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }
//获取库存组织
  public getOrganize(url: string, paramObj: any) {
    url = APP_SERVE_URL_TEST +url + this.toQueryString(paramObj);
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token'), 'X-TenantId':localStorage.getItem('teamId'), "Prefer-Lang":"zh-CN","Accept": "application/json", "X-Logined-Sign": localStorage.getItem('userName'),"X-UserId": localStorage.getItem('userId'), });
    console.log(headers);
    console.log(url);
    console.log(paramObj);
    return this.http.get(url, new RequestOptions({headers: headers}),)
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }
  public getOrganizea(url: string, paramObj: any) {
    url = APP_SERVE_URL_TEST +url + this.toQueryString(paramObj);
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token'), 'X-TenantId':localStorage.getItem('teamId'), "Prefer-Lang":"zh-CN","Accept": "application/json", "X-Logined-Sign": localStorage.getItem('userName'),"X-UserId": localStorage.getItem('userId'), });
    console.log(headers);
    console.log(url);
    console.log(paramObj);
    return this.http.get(url, new RequestOptions({headers: headers}),)
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleErrora(error));
  }
//删除订单
  public deleteId(url: string, paramObj: any) {
    url = APP_SERVE_URL_TEST +url + this.toQueryString(paramObj);
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token'), 'X-TenantId':localStorage.getItem('teamId'), "Prefer-Lang":"zh-CN","Accept": "application/json", "X-Logined-Sign": localStorage.getItem('userName'),"X-UserId": localStorage.getItem('userId'), });
    console.log(headers);
    console.log(url);
    console.log(paramObj);
    return this.http.delete(url, new RequestOptions({headers: headers}),)
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public post(url: string, paramObj: any) {
    url = APP_SERVE_URL_TEST + url;
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, this.toBodyString(paramObj), new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public postBody(url: string, paramObj: any) {
    // this.showLoading();
    url = APP_SERVE_URL_TEST + url;
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public postBodyOne(url: string, paramObj: any) {
    // this.showLoading();
    url = 'https://wmsapi.sunwoda.com' + url;
    let headers = new Headers({'Content-Type': 'x-wwww-form-urlencoded'});
    return this.http.post(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public newPostBody(url: string, paramObj: any) {
    console.log("aaa");
    url = APP_SERVE_URL_TEST + url;
    console.log(url);
    let headers = new Headers({'Content-Type': 'application/json',"Accept": "application/json","X-TenantId": localStorage.getItem('teamId'),
      "X-Logined-Sign": localStorage.getItem('userName'),"X-UserId": localStorage.getItem('userId'),"Authorization":localStorage.getItem('token')  });
    return this.http.post(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public postWithHeaders(url: string, paramObj: any) {
    url = APP_SERVE_URL_TEST + url;
    var authorization = 'Bearer ' + localStorage.getItem("token");
    var teamId = localStorage.getItem("teamId");
    var userName = localStorage.getItem("userName");
    let headers = new Headers({'Content-Type': 'application/json', 'X-TenantId':teamId, 'X-Logined-Sign': userName, "Prefer-Lang":"zh-CN"});
    console.log(headers);
    console.log(url);

    return this.http.post(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }
  public postWithHeadersNew(url: string, paramObj: any) {
    var authorization = 'Bearer ' + localStorage.getItem("token");
    var teamId = localStorage.getItem("teamId");
    var userName = localStorage.getItem("userName");
    let headers = new Headers({'Content-Type': 'application/json', 'X-TenantId':teamId, 'X-Logined-Sign': userName, "Prefer-Lang":"zh-CN"});
    console.log(headers);
    console.log(url);

    return this.http.post(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public putWithHeaders(url: string, paramObj: any) {
    url = APP_SERVE_URL_TEST + url;
    var userName = localStorage.getItem("userName");
    console.log(url);

    var authorization = 'Bearer ' + localStorage.getItem("token");
    var teamId = localStorage.getItem("teamId");
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': authorization, 'X-TenantId':teamId, "Prefer-Lang":"zh-CN"});
    // let headers = new Headers({'Content-Type': 'application/json', 'X-TenantId':teamId, 'X-Logined-Sign': userName});
    return this.http.put(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }
  public putWithHeadersServes(url: string, paramObj: any) {

    var userName = localStorage.getItem("userName");
    console.log(url);

    var authorization = 'Bearer ' + localStorage.getItem("token");
    var teamId = localStorage.getItem("teamId");
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': authorization, 'X-TenantId':teamId, "Prefer-Lang":"zh-CN",'X-Logined-Sign': userName});
    // let headers = new Headers({'Content-Type': 'application/json', 'X-TenantId':teamId, 'X-Logined-Sign': userName});
    return this.http.put(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
    });
    toast.present();
  }

  showLoading() {
    if(!this.loading){
      this.loading = this.loadCtrl.create({
        content: 'loading...'
      });
      this.loading.present();
    }
  }

  dismissLoading() {
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
    }
  }

  clearLocalstorage() {

  }

  private handleSuccess(result) {
    // this.dismissLoading();
    if(this.loading) this.loading.dismiss();
    if (result['error'] === 'invalid_token') {
      this.showAlert();
    }
    return result;
  }

  showAlert() {

    let alert = this.alertCtrl.create({
      title: '温馨提示',
      message: '登录过期 , 点击确定重新登录',
      buttons: [{
        text:'确定',
        handler: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          localStorage.removeItem("teamId");
          localStorage.removeItem("id");
          localStorage.removeItem('sort');
          this.app.getRootNav().setRoot('GuidPage');
        }
      }]
    });
    alert.present();
  }


  private handleError(error: Response | any) {
    this.dismissLoading();
    let msg = '请求失败';
    if (error.status == 0) {
      msg = '请求地址错误';
    }
    if (error.status == 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在';
      console.error(msg+'，请检查路径是否正确');
    }
    console.log(error);
    this.presentToast(error.message);
    return error._body;
  }
  private handleErrora(error: Response | any) {
    this.dismissLoading();
    let msg = '请求失败';
    if (error.status == 0) {
      msg = '请求地址错误';
    }
    if (error.status == 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在';
      console.error(msg+'，请检查路径是否正确');
    }
    if (error.status == 403) {
      // this.showAlert()
      console.error("403");
    }
    console.log(error);
    this.presentToast(error.message);
    return error._body;
  }
  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return '?' + ret.join('&');
  }

  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }

  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }
}
