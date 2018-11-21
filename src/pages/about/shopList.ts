import { Component } from '@angular/core';
import { HttpService } from '../../service/HttpService';
import { NavController,AlertController} from 'ionic-angular';
import {ShopListComfirmPage} from "../shop-list-comfirm/shop-list-comfirm";
import { App } from 'ionic-angular';
import {ProductionPage} from "../production/production"
import { GlobalVariable} from '../../globalVariable/globalVariable';
@Component({
  selector: 'page-shopList',
  templateUrl: 'shopList.html'
})
export class ShopListPage {
  checked = false;
  data = [];
  action = '提交申请';
  myDo = '编辑';
  amount: number;
  subFlag='1';
  deleteId=[];
  submitData=[];
  total:number=0;
  showWhat;
  constructor(public navCtrl: NavController, private httpService: HttpService,private app : App, public alertCtrl: AlertController) {
  }
  //初始化获得购物车数量
  ionViewWillEnter(){
    this.checkValue(GlobalVariable.shopCount);
  }
  //点击跳转到登录界面
  login(){

    this.app.getRootNav().push('GuidPage')
  }
  //初始化获得数据，只渲染一次
  ngOnInit(): void {
    var show=localStorage.getItem("token");
    if(show){
      this.showWhat=1;
    }else {
      this.showWhat=0;
    }
    console.log(this.showWhat);
    if(this.showWhat==1){
      this.httpService.getOrganizea('/app/shopping/car/list', {}
    ).then(
      res => this.handleSuccess(res))
        .catch(error => this.handleErrora(error));
    }
  }
  handleErrora(error){
    console.log(error)
  }
  //弹窗函数
  fShowConfirm(title, message, disagreeText, agreeText) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: disagreeText,
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: agreeText,
          handler: () => {
            this.app.getRootNav().push('ProductionPage',{whatSend:0})
          }
        }
      ]
    });
    confirm.present();
  }
  //查询购物车条数，根据条数进行操作函数
  checkValue(a){
   if(a==0){
     var codeMessage='当前购物车无商品，请到商品页挑选您喜欢的商品吧！';
     this.fShowConfirm('Tips', codeMessage, '取消', '确定');
   }
 }
  handleSuccess(result) {
    console.log(result);
    // this.checkValue(result.data.length);
    for (var i = 0; i < result.data.length; i++) {
      result.data[i].ifChecked = 0;
      for (var a = 0; a < result.data[i].content.length; a++) {
        result.data[i].content[a].isChecked = 0;
        result.data[i].content[a].buyNum = result.data[i].content[a].quantity;
        switch(result.data[i].content[a].gatherStatus){
          case '0':
            result.data[i].content[a].gatherStatus ='未开始';
            break;
          case '1':
            result.data[i].content[a].gatherStatus ='进行中';
            break;
          case '2':
            result.data[i].content[a].gatherStatus ='已结束';
            break;
          case '3':
            result.data[i].content[a].gatherStatus ='未成团';
            break;
          case '4':
            result.data[i].content[a].gatherStatus= '已成团';
            break;
        }
        if (!result.data[i].content[a].currency) {
          result.data[i].content[a].currency = '￥';
        } else if (result.data[i].content[a].currency = 'CNY') {
          result.data[i].content[a].currency = '￥';
        } else if (result.data[i].content[a].currency = 'USD') {
          result.data[i].content[a].currency = '$';
        }
        if (result.data[i].content[a].imgPathList.length>1) {
          result.data[i].content[a].imgPathList=result.data[i].content[a].imgPathList[0]
        }
      }
    }
    this.data = result.data;
    this.amount=result.total;
    GlobalVariable.shopCount=result.total;
    console.log(this.data);
  }
  //勾选单选框函数
  updateCucumber(comp,option) {
    var flag=0;
    var myFlag=0;
    if(!option.isChecked){
      this.total=Number((this.total-parseFloat(option.goodPrice)*option.buyNum).toFixed(2));
      comp.ifChecked=0;
      this.checked=false
    }else if(option.isChecked){
      this.total=Number((this.total+parseFloat(option.goodPrice)*option.buyNum).toFixed(2));
       for(var e=0;e<comp.content.length;e++){
         if(comp.content[e].isChecked){
           flag++
         }
       }
      if(flag==comp.content.length){
        comp.ifChecked=1
      }
       for(var f=0;f<this.data.length;f++){
         if(this.data[f].ifChecked){
           myFlag++
         }
       }
      if(myFlag==this.data.length){
        this.checked=true;
      }
    }
  }
  //右上角编辑函数
  doAction() {
    if (this.myDo == '编辑') {
      this.myDo = '完成';
      this.action = '删除';
    } else {
      this.myDo = '编辑';
      this.action = '提交申请';
      this.total=0;
      for(var t = 0; t < this.data.length; t++){
        for(var z = 0; z < this.data[t].content.length; z++){
               this.data[t].content[z].buyNum=0
        }
      }
      this.checked=false;
      for(var c = 0; c < this.data.length; c++){
         this.data[c].ifChecked=0;
          for(var d = 0; d < this.data[c].content.length; d++){
           this.data[c].content[d].isChecked=0
        }
      }
    }
  }
  //数量减
  minus(option){
    if(option.isChecked==1&&option.buyNum>0){
      this.total=Number((this.total-parseFloat(option.goodPrice)).toFixed(2))
    }
    if( option.buyNum<=0){
      option.buyNum=0;
    }else{
      option.buyNum--;
    }
  }
  //数量加
  add(option) {
    if(option.isChecked==1){
      this.total=Number((this.total+parseFloat(option.goodPrice)).toFixed(2))
    }
    option.buyNum++;
  }
  //勾选组选框函数
  updateGroupCheck(comp) {
    for (var b = 0; b < comp.content.length; b++) {
      if (comp.ifChecked) {
        var newFlag=0;
        for(var c = 0; c < this.data.length; c++){
          if(this.data[c].ifChecked==1){
              newFlag++
          }
        }
        if(newFlag==this.data.length){this.checked=true}
        if(comp.content[b].isChecked == 0){
          this.total=Number((this.total+parseFloat(comp.content[b].goodPrice)*comp.content[b].buyNum).toFixed(2));
        }
        comp.content[b].isChecked = 1
      } else if(!comp.ifChecked) {
        this.total=Number((this.total-parseFloat(comp.content[b].goodPrice)*comp.content[b].buyNum).toFixed(2));
        comp.content[b].isChecked = 0
        this.checked=false
      }
    }
  }
  //全选函数
  allSelect(){
    for(var c = 0; c < this.data.length; c++){
      for(var d = 0; d < this.data[c].content.length; d++){
        if(this.checked){
          if(this.data[c].content[d].isChecked==0){
            this.total=Number((this.total+parseFloat(this.data[c].content[d].goodPrice)*this.data[c].content[d].buyNum).toFixed(2));
          }
          this.data[c].ifChecked=1;
          this.data[c].content[d].isChecked=1;
        }else{
          this.total=0;
          this.data[c].ifChecked=0;
          this.data[c].content[d].isChecked=0;
        }
      }
    }
  }
  //删除或者提交函数
  confirm(){
    if(this.action=="删除"){
      this.deleteId=[];
      for(var c = 0; c < this.data.length; c++) {
        for (var d = 0; d < this.data[c].content.length; d++) {
              if(this.data[c].content[d].isChecked){
                this.deleteId.push(this.data[c].content[d].itemId)
              }
            }
          }
          if(this.deleteId.length>0){
            this.httpService.deleteId('/app/shopping/car/batchDel', {'ids':this.deleteId}
            ).then(
              res => this.handleDelSuccess(res));
          }else if(this.deleteId.length==0){
            this.httpService.presentToast("请选择您要删除的条目")
          }
        }else if(this.action=="提交申请"){
                this.subFlag='1';
                this.submitData=[];
           for(var a = 0; a < this.data.length; a++) {
              for (var b = 0; b < this.data[a].content.length; b++) {
                if(this.data[a].content[b].isChecked){
                  if(this.data[a].content[b].gatherStatus=='未开始'){
                   this.httpService.presentToast("集采状态为未开始不能提交");
                   this.subFlag='0';
                    break
                  }
                  if(this.data[a].content[b].gatherStatus=='未成团'){
                    this.httpService.presentToast("集采状态为未成团不能提交");
                    this.subFlag='0';
                    break
                  }
                  if(this.data[a].content[b].gatherStatus=='进行中'){
                    this.httpService.presentToast("集采状态为进行中不能提交");
                    this.subFlag='0';
                    break
                  }
                  if(this.data[a].content[b].gatherStatus=='已结束'){
                    this.httpService.presentToast("集采状态为已结束不能提交");
                    this.subFlag='0';
                    break
                  }
                   if(this.data[a].content[b].gatherStatus==''||this.data[a].content[b].gatherStatus=='已成团'){
                     this.submitData.push(this.data[a].content[b])
                   }
                }
              }
            }
            console.log(this.submitData);
           if(this.submitData.length>0 && this.subFlag=='1'){
            this.app.getRootNav().push('ShopListComfirmPage',{'sendData':this.submitData,'totalPrice':this.total})

           }else if(this.submitData.length==0){
             this.httpService.presentToast("未选择商品")
           }
        }
     }
  handleDelSuccess(result){
    console.log(result);
    this.total=0;
    this.checked=false;
    this.httpService.getOrganize('/app/shopping/car/list', {}
    ).then(
      res => this.handleSuccess(res));
    }
}

