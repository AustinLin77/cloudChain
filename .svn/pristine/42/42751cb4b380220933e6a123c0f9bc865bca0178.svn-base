import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private app: App) {

  }

  onQuit() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("teamId");
    localStorage.removeItem("id");
    this.app.getRootNav().setRoot(LoginPage);
  }
}
