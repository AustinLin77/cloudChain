import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popoverr',
  templateUrl: 'popoverr.html',
})
export class PopoverrPage {
  all:number=6;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }
  allF(){
    this.all=0;
  }
  onGoingF(){
    this.all=3;
  }
  alreadyF(){
    this.all=1;
  }
  soonF(){
   this.all=4;
  }
  unreadyF(){
   this.all=2;
  }
  reset(){
   this.all=5;
  }
  confirm(){
    this.viewCtrl.dismiss(this.all)
  }

}
