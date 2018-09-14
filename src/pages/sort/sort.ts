import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { ProductionPage } from "../production/production";
/**
 * Generated class for the SortPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sort',
  templateUrl: 'sort.html',
})
export class SortPage {
   data= [];
   secData=[];
   allId;
   constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService) {
  }
  //选择哪一个一级大类就显示此一级大类下的二级类别
  itemSelected(index){
    for(var a=0;a<this.data.length;a++){
      if(a==index){
        this.data[a].flag=1;
       this.secData=this.data[a].children;
      }else{
        this.data[a].flag=0
      }
    }
    console.log(this.data)
  }
  //初始化获得数据
  ngOnInit():void{
    if(!localStorage.getItem('sort')){
      this.httpService.getSort('/no/filter/app/catg/list', { }
      ).then(
      res => this.handleSuccess(res));
      console.log("aa")
    }else{
    this.data=JSON.parse(localStorage.getItem('sort'));
      this.secData=this.data[0].children;
    console.log(this.data)
    }
  }
  handleSuccess(result){
    this.httpService.hideLoading();
    console.log(result);
    for(var a=0;a<result.data.length;a++){
      result.data[a].flag=0
    }
    result.data[0].flag=1;

    var str = JSON.stringify(result.data);
    localStorage.setItem('sort',str);
    console.log(localStorage.getItem('sort'));
    this.data=result.data;
    this.secData=this.data[0].children;
    console.log(this.secData)
  }
  //选择全部跳转
  allSort(){
    for(var a=0;a<this.data.length;a++){
      if(this.data[a].flag==1){
       this.allId=this.data[a].id;
        console.log(this.allId)
      }
    }
    this.navCtrl.push('ProductionPage',{whatSend:1,id:this.allId})
  }
  //单个选择跳转
  singleSort(id){
    this.navCtrl.push('ProductionPage',{whatSend:1,id:id})
  }
}
