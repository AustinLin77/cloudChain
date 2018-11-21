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
   minPrice:number;
   maxPrice:number;
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
    if(this.minPrice<0){
      this.minPrice=0;
      this.httpService.presentToast("请正确填写最低价")
    }
    if(this.minPrice>this.maxPrice){
      this.minPrice=0;
      this.httpService.presentToast("最低价不可高于最高价")
    }
  }
  //填写完区间高价后检查
  adjustMax(){
    if(this.maxPrice<0){
      this.maxPrice=0;
      this.httpService.presentToast("请正确填写最高价")
    }
    if(this.maxPrice<this.minPrice){
      this.maxPrice=0;
      this.httpService.presentToast("最高价不可低于最低价")
    }
  }
  reset(){
    this.minPrice=0;
    this.maxPrice=0;
  }
  //提交
  confirm(){
    if(this.minPrice==null&&this.maxPrice==null){
      this.httpService.presentToast("请正确填写筛选最高价和最低价");
      return
    }
    if(this.minPrice!=null){
      this.min=this.minPrice.toString();
    }else{ this.min ='839555555'}
    if(this.maxPrice!=null){
      var max=this.maxPrice.toString();
    }else{ max='839666666'}
    this.viewCtrl.dismiss(this.min,max)
  }
}

