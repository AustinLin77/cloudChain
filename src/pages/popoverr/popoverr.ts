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
  myAll:number=6;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }
  myAllF(){
    this.myAll=0;
  }
  onGoingF(){
    this.myAll=3;
  }
  alreadyF(){
    this.myAll=1;
  }
  soonF(){
   this.myAll=4;
  }
  unreadyF(){
   this.myAll=2;
  }
  reset(){
   this.myAll=5;
  }
  confirm(){
    this.viewCtrl.dismiss(this.myAll)
  }

}
