import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import { HttpService} from '../../service/HttpService';
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})

export class PopoverPage {
   myMinPrice:number;
   myMaxPrice:number;
   min;
   max;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService,private viewCtrl:ViewController) {
  }
  // ngOnInit(){
  //    document.querySelector(".popover-content").offsetLeft="88px";
  //
  // }



   //填写完区间低价后检查
  adjustMin(){
    if(this.myMinPrice<0){
      this.myMinPrice=0;
      this.httpService.presentToast("请正确填写最低价")
    }
    if(this.myMinPrice>this.myMaxPrice){
      this.myMinPrice=0;
      this.httpService.presentToast("最低价不可高于最高价")
    }
  }
  //填写完区间高价后检查
  adjustMax(){
    if(this.myMaxPrice<0){
      this.myMaxPrice=0;
      this.httpService.presentToast("请正确填写最高价")
    }
    if(this.myMaxPrice<this.myMinPrice){
      this.myMaxPrice=0;
      this.httpService.presentToast("最高价不可低于最低价")
    }
  }
  reset(){
    this.myMinPrice=0;
    this.myMaxPrice=0;
  }
  //提交
  confirm(){
    if(this.myMinPrice==null&&this.myMaxPrice==null){
      this.httpService.presentToast("请正确填写筛选最高价和最低价");
      return
    }
    if(this.myMinPrice!=null){
      this.min=this.myMinPrice.toString();
    }else{ this.min ='839555555'}
    if(this.myMaxPrice!=null){
      var max=this.myMaxPrice.toString();
    }else{ max='839666666'}
    this.viewCtrl.dismiss(this.min,max)
  }
}

