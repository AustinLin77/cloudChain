import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import { HttpService} from '../../../../service/HttpService';
import { LoginPage } from '../../../login/login';
/**
 * Generated class for the MyInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-information',
  templateUrl: 'my-information.html',
})
export class MyInformationPage {
  data=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService,private app:  App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyInformationPage');
  }
  ngOnInit():void{
   this.httpService.getOrganize('/user/app/get/company', {}
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result){
    console.log(result);
    this.data=result.data
  }
  onQuit() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("teamId");
    localStorage.removeItem("id");
    localStorage.removeItem('sort');
    this.app.getRootNav().setRoot('LoginPage');
  }
}
