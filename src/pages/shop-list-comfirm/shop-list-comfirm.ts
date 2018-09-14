import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { SubmitStatusPage} from "../submit-status/submit-status"
/**
 * Generated class for the ShopListComfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-list-comfirm',
  templateUrl: 'shop-list-comfirm.html',
})
export class ShopListComfirmPage {
   myData=[];
   organization;
   selectOptions={};
   organize;
   total:number=0;
   map={};
   flag=0;
   message:string;
   orderId;
   myTotal:number=0;
   myRealData=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
  }
  //初始化获得数据
  ngOnInit():void{
    this.myData=this.navParams.data.sendData;
    this.total=this.navParams.data.totalPrice;
    console.log(this.navParams.data.sendData);
    //根据sellerName重新构造data数组
    for(var i = 0; i < this.myData.length; i++){
      var ai = this.myData[i];
      if(!this.map[ai.sellerName]){
        this.myRealData.push({
          companyName:ai.sellerName,
          currency:ai.currency,
          data:[ai]
        });
        this.map[ai.sellerName] = ai;
      }else{
        for(var j = 0; j < this.myRealData.length; j++){
          var dj = this.myRealData[j];
          if(dj.companyName == ai.sellerName){
            dj.data.push(ai);
            break;
          }
        }
      }
    }
    console.log(this.myRealData);
    for(var t=0;t<this.myRealData.length;t++){
      for(var p=0;p<this.myRealData[t].data.length;p++){
        this.myTotal=Number((this.myTotal+parseFloat(this.myRealData[t].data[p].goodPrice)*this.myRealData[t].data[p].buyNum).toFixed(2))
      }
       this.myRealData[t].total=this.myTotal;
      this.myTotal=0
    }

    console.log(this.myRealData);
    this.httpService.getOrganizea('/app/get/current/user/org', {})
      .then(res => this.handleUserInfoSuccess(res))
      .catch(error => this.handleError(error));
  }
  handleError(error){
    console.log(error)
  }
  handleUserInfoSuccess(result){
    this.organization=result.data;
    console.log(this.organization);
    this.selectOptions= {
      title: '选择库存组织',
      mode: 'md'
    };
  }
  //提交
  confirm(){
    var comfirmData=new Array();
   for(var i = 0 ;i<this.myData.length;i++){
      comfirmData[i]={itemId:this.myData[i].itemId,purchaseNow:'',quantity:this.myData[i].buyNum,
       requiredDate:this.myData[i].requiredDate,select:true,sellerName:this.myData[i].sellerName};
   }
   for(var k=0;k<comfirmData.length;k++){
     if(!comfirmData[k].requiredDate){
       this.httpService.presentToast("请选择需求日期");
       return null
     }
   }
   if(!this.organize){
     this.httpService.presentToast("请选择库存组织");
     return null
   }
   console.log(comfirmData);
    this.flag=1;
    var data={
      "carList": comfirmData,
      "orgId": this.organize
    };
    this.httpService.newPostBody('/app/order/add',data).then(res => this.handleComfirmSuccess(res));

  }
  handleComfirmSuccess(result){
    console.log(result);
    this.message=result.message;
    this.orderId=result.data;
    this.navCtrl.push('SubmitStatusPage',{'mes':this.message,'orderId':this.orderId});
   }
}
