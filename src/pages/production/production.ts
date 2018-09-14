import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoodsdetailsPage} from '../goodsdetails/goodsdetails';
import { HttpService } from '../../service/HttpService';
import { TabsPage } from "../tabs/tabs";
import { PopoverController } from 'ionic-angular';
/**
 * Generated class for the ProductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-production',
  templateUrl: 'production.html',
})
export class ProductionPage {
  pageNum:number;
  pageSize:number=18;
  cnt:number;
  flag :boolean;
  flagOne:boolean=false;
  url='/no/filter/app/product/list';
  products=[];
  chain;
  what;
  idss=111;
  key:string;
  firstChoice:number=0;
  secondChoice:number=1;
  thirdChoice:number=1;
  fourthChoice:number=1;
  minPrice;
  maxPrice;
  fourth:number=1;
  shaiByPrice:number=1;
  shaiByTime:number=1;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService,
              public popoverCtrl: PopoverController) {
  }
  ownerBack(){
    this.navCtrl.setRoot(TabsPage,{'myindex':0});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionPage');
    this.chain=localStorage.getItem('chain');
    console.log(this.chain)
  }
  //路由跳转到商品详情界面，携带参数跳转
  goodsDetails(a,b,c,d){
    this.navCtrl.push('GoodsdetailsPage',{
      name:a,
      howhot:b,
      howmuch:c,
      id:d,
      what:this.what,
      idss:this.idss,
      canGo:false
    });
  }
  //初始化得到数据
  ngOnInit():void {
    this.what=this.navParams.data.whatSend;
    console.log(this.what);
    //正常进入产品列表
    if(this.what==0){
      this.pageNum=1;
      this.httpService.get(this.url, {
        'pageNum':this.pageNum,
        'pageSize':this.pageSize
      }
      ).then(
      res => this.handleSuccess(res));
      //从分类进入产品列表
   }else if(this.what==1){
      console.log("aaaaaa");
      this.pageNum=1;
      this.idss=this.navParams.data.id;
      this.httpService.get( '/no/filter/app/product/list', {
        'catgId':this.idss,
        'pageNum':this.pageNum,
        'pageSize':this.pageSize
      }
       ).then(
        res => this.handleSuccess(res));
    }else if(this.what==2){
      this.firstChoice=0;
      this.secondChoice=1;
      this.thirdChoice=1;
      this.fourthChoice=1;
      console.log(window.localStorage.getItem("searchKey"));
      this.key=window.localStorage.getItem("searchKey")
      if(!window.localStorage.getItem("searchKey")){
        this.httpService.presentToast("请输入产品名称查询")
      }else if(window.localStorage.getItem("searchKey")){
        this.pageNum=1
        this.httpService.get(this.url, {'search':window.localStorage.getItem("searchKey")}
        ).then(
          res => this.handleSearchSuccess(res));
      }
     }
    }

  //初始化获取数据成功后函数
  handleSuccess(result) {
    if(result.data.length==0){
      this.httpService.presentToast("无更多产品")
    }
    this.pageNum++;
    console.log(result);
    this.cnt=result.data.length;
    if(this.cnt<this.pageSize){
      this.flag=false;
    }
    for(var i=0;i<result.data.length;i++){
      this.products.push(result.data[i]);
      if(!result.data[i].imgPathList){
        result.data[i].imgPathList='../../assets/imgs/f1.jpg';
      }else if(result.data[i].imgPathList.length>1){
        result.data[i].imgPathList=result.data[i].imgPathList[0];
      }
      switch (result.data[i].hot){
        case 0:
          result.data[i].hot='低';
          break;
        case 1:
          result.data[i].hot= '热';
          break;
      }
      if(!result.data[i].currency){
        result.data[i].currency='￥';
      }
      switch (result.data[i].currency){
        case 'CNY':
          result.data[i].currency='￥';
          break;
        case 'USD':
          result.data[i].currency='$';
          break;
      }
    }console.log(this.products);
  }
  //下拉刷新操作
  doInfinite(infiniteScroll){
    if(this.key){
      if(this.what==0||this.what==2){
        //综合搜索
        if(this.firstChoice==0){
          console.log(this.pageNum)
          console.log("1111");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
                'search':this.key,
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
              }
            ).then(
              res =>  this.handleSuccess(res));
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
          //根据价格排序
        }else if(this.thirdChoice==0&&this.fourthChoice==1){
          console.log("2222");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
              'search':this.key,
                'flag':'1',
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
          //根据上架时间排序
        }else if(this.secondChoice==0&&this.fourthChoice==1){
          console.log("3333");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
              'search':this.key,
                'flag':'2',
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
          //根据筛选区间排序
        }else if(this.fourthChoice==0&&this.thirdChoice==1&&this.secondChoice==1){
          console.log("4444");
          setTimeout(() => {
            infiniteScroll.complete();
            this.fourth=1;
            //最小值没输入
            if(this.minPrice==839555555){
              this.httpService.get(this.url, {
                'search':this.key,
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
              //最大值没输入
            }else if(this.maxPrice==839666666){
              this.httpService.get(this.url, {
                'search':this.key,
                  'minPrice':this.minPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else{
              this.httpService.get(this.url, {
                'search':this.key,
                  'minPrice':this.minPrice,
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
          //筛选后根据价格排序
        }else if(this.fourthChoice==0&&this.thirdChoice==0){
          console.log("5555");
          setTimeout(() => {
            infiniteScroll.complete();
            this.shaiByPrice=1;
            if(this.minPrice==839555555){
              this.httpService.get(this.url, {
                'search':this.key,
                  'flag':'1',
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else if(this.maxPrice==839666666){
              this.httpService.get(this.url, {
                'search':this.key,
                  'flag':'1',
                  'minPrice':this.minPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else{
              this.httpService.get(this.url, {
                'search':this.key,
                  'flag':'1',
                  'minPrice':this.minPrice,
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
          //筛选后根据上架时间排序
        }else if(this.fourthChoice==0&&this.secondChoice==0){
          console.log("6666");
          setTimeout(() => {
            infiniteScroll.complete();
            this.shaiByTime=1;
            if(this.minPrice==839555555){
              this.httpService.get(this.url, {
                'search':this.key,
                  'flag':'2',
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else if(this.maxPrice==839666666){
              this.httpService.get(this.url, {
                'search':this.key,
                  'flag':'2',
                  'minPrice':this.minPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else{
              this.httpService.get(this.url, {
                'search':this.key,
                  'flag':'2',
                  'minPrice':this.minPrice,
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
        }
      }else if(this.what==1){
        if(this.firstChoice==0){
          console.log("1111");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
              'search':this.key,
                'catgId':this.idss,
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
              }
            ).then(
              res =>  this.handleSuccess(res));
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
        }else if(this.thirdChoice==0&&this.fourthChoice==1){
          console.log("2222");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
              'search':this.key,
                'catgId':this.idss,
                'flag':'1',
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
        }else if(this.secondChoice==0&&this.fourthChoice==1){
          console.log("3333");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
              'search':this.key,
                'catgId':this.idss,
                'flag':'2',
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
        }else if(this.fourthChoice==0&&this.thirdChoice==1&&this.secondChoice==1){
          console.log("4444");
          setTimeout(() => {
            infiniteScroll.complete();
            this.fourth=1;
            if(this.minPrice==839555555){
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else if(this.maxPrice==839666666){
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'minPrice':this.minPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else{
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'minPrice':this.minPrice,
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
        }else if(this.fourthChoice==0&&this.thirdChoice==0){
          console.log("5555");
          setTimeout(() => {
            infiniteScroll.complete();
            this.shaiByPrice=1;
            if(this.minPrice==839555555){
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'flag':'1',
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else if(this.maxPrice==839666666){
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'flag':'1',
                  'minPrice':this.minPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else{
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'flag':'1',
                  'minPrice':this.minPrice,
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
        }else if(this.fourthChoice==0&&this.secondChoice==0){
          console.log("6666");
          setTimeout(() => {
            infiniteScroll.complete();
            this.shaiByTime=1;
            if(this.minPrice==839555555){
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'flag':'2',
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else if(this.maxPrice==839666666){
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'flag':'2',
                  'minPrice':this.minPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }else{
              this.httpService.get(this.url, {
                'search':this.key,
                  'catgId':this.idss,
                  'flag':'2',
                  'minPrice':this.minPrice,
                  'maxPrice':this.maxPrice,
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if(!this.flag) {
              infiniteScroll.enable(false);
            }}, 2000);
        }
      }
    }else if(!this.key) {
      if (this.what == 0) {
        //综合搜索
        if (this.firstChoice == 0) {
          console.log("1111");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
          //根据价格排序
        } else if (this.thirdChoice == 0 && this.fourthChoice == 1) {
          console.log("2222");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
                'flag': '1',
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
          //根据上架时间排序
        } else if (this.secondChoice == 0 && this.fourthChoice == 1) {
          console.log("3333");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
                'flag': '2',
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
          //根据筛选区间排序
        } else if (this.fourthChoice == 0 && this.thirdChoice == 1 && this.secondChoice == 1) {
          console.log("4444");
          setTimeout(() => {
            infiniteScroll.complete();
            this.fourth = 1;
            //最小值没输入
            if (this.minPrice == 839555555) {
              this.httpService.get(this.url, {
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
              //最大值没输入
            } else if (this.maxPrice == 839666666) {
              this.httpService.get(this.url, {
                  'minPrice': this.minPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else {
              this.httpService.get(this.url, {
                  'minPrice': this.minPrice,
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
          //筛选后根据价格排序
        } else if (this.fourthChoice == 0 && this.thirdChoice == 0) {
          console.log("5555");
          setTimeout(() => {
            infiniteScroll.complete();
            this.shaiByPrice = 1;
            if (this.minPrice == 839555555) {
              this.httpService.get(this.url, {
                  'flag': '1',
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else if (this.maxPrice == 839666666) {
              this.httpService.get(this.url, {
                  'flag': '1',
                  'minPrice': this.minPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else {
              this.httpService.get(this.url, {
                  'flag': '1',
                  'minPrice': this.minPrice,
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
          //筛选后根据上架时间排序
        } else if (this.fourthChoice == 0 && this.secondChoice == 0) {
          console.log("6666");
          setTimeout(() => {
            infiniteScroll.complete();
            this.shaiByTime = 1;
            if (this.minPrice == 839555555) {
              this.httpService.get(this.url, {
                  'flag': '2',
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else if (this.maxPrice == 839666666) {
              this.httpService.get(this.url, {
                  'flag': '2',
                  'minPrice': this.minPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else {
              this.httpService.get(this.url, {
                  'flag': '2',
                  'minPrice': this.minPrice,
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
        }
      } else if (this.what == 1) {
        if (this.firstChoice == 0) {
          console.log("1111");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
                'catgId': this.idss,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
        } else if (this.thirdChoice == 0 && this.fourthChoice == 1) {
          console.log("2222");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
                'catgId': this.idss,
                'flag': '1',
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
        } else if (this.secondChoice == 0 && this.fourthChoice == 1) {
          console.log("3333");
          setTimeout(() => {
            infiniteScroll.complete();
            this.httpService.get(this.url, {
                'catgId': this.idss,
                'flag': '2',
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
            ).then(
              res => this.handleSuccess(res));
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
        } else if (this.fourthChoice == 0 && this.thirdChoice == 1 && this.secondChoice == 1) {
          console.log("4444");
          setTimeout(() => {
            infiniteScroll.complete();
            this.fourth = 1;
            if (this.minPrice == 839555555) {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else if (this.maxPrice == 839666666) {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'minPrice': this.minPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'minPrice': this.minPrice,
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
        } else if (this.fourthChoice == 0 && this.thirdChoice == 0) {
          console.log("5555");
          setTimeout(() => {
            infiniteScroll.complete();
            this.shaiByPrice = 1;
            if (this.minPrice == 839555555) {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'flag': '1',
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else if (this.maxPrice == 839666666) {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'flag': '1',
                  'minPrice': this.minPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'flag': '1',
                  'minPrice': this.minPrice,
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
        } else if (this.fourthChoice == 0 && this.secondChoice == 0) {
          console.log("6666");
          setTimeout(() => {
            infiniteScroll.complete();
            this.shaiByTime = 1;
            if (this.minPrice == 839555555) {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'flag': '2',
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else if (this.maxPrice == 839666666) {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'flag': '2',
                  'minPrice': this.minPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            } else {
              this.httpService.get(this.url, {
                  'catgId': this.idss,
                  'flag': '2',
                  'minPrice': this.minPrice,
                  'maxPrice': this.maxPrice,
                  'pageNum': this.pageNum,
                  'pageSize': this.pageSize
                }
              ).then(
                res => this.handleSuccess(res));
            }
            if (!this.flag) {
              infiniteScroll.enable(false);
            }
          }, 2000);
        }
      }
    }
  }
  //点击综合搜索
  normal(){
    if(this.what==1){
      //搜索框有值
      if(this.key){
        this.firstChoice=0;
        this.secondChoice=1;
        this.thirdChoice=1;
        this.fourthChoice=1;
        this.fourth=1;
        this.pageNum=1;
        this.httpService.get(this.url, {
          'catgId':this.idss,
          'search':this.key,
          'pageNum':this.pageNum,
          'pageSize':this.pageSize
        }
        ).then(
          res => this.handleSortSuccess(res));
        //搜索框无值
      }else if(!this.key){
        this.firstChoice=0;
        this.secondChoice=1;
        this.thirdChoice=1;
        this.fourthChoice=1;
        this.fourth=1;
        this.pageNum=1;
        this.httpService.get(this.url, {
          'catgId':this.idss,
          'pageNum':this.pageNum,
          'pageSize':this.pageSize
        }
        ).then(
          res => this.handleSortSuccess(res));}
    }else if(this.what==0||this.what==2){
      if(this.key){
       this.firstChoice=0;
       this.secondChoice=1;
       this.thirdChoice=1;
       this.fourthChoice=1;
        this.fourth=1;
       this.pageNum=1;
       this.httpService.get(this.url, {
         'search':this.key,
         'pageNum':this.pageNum,
         'pageSize':this.pageSize
       }
        ).then(
        res => this.handleSortSuccess(res));
     }else if(!this.key){
       this.firstChoice=0;
       this.secondChoice=1;
       this.thirdChoice=1;
       this.fourthChoice=1;
        this.fourth=1;
       this.pageNum=1;
       this.httpService.get(this.url, {
         'pageNum':this.pageNum,
           'pageSize':this.pageSize
       }
         ).then(
       res => this.handleSortSuccess(res));}}
  }
  //根据上架时间搜索
  sortBy(){
    if(this.what==1){
       if(this.key){
         this.firstChoice=1;
         this.secondChoice=0;
         this.thirdChoice=1;
         this.pageNum=1;
         if(this.fourthChoice==0) {
           this.shaiByTime=0;
           if (this.minPrice == 839555555) {
             this.httpService.get(this.url, {
             'catgId':this.idss,
             'search':this.key,
             'flag': '2',
             'maxPrice': this.maxPrice,
             'pageNum': this.pageNum,
             'pageSize': this.pageSize
             }
            ).then(
             res => this.handleSortSuccess(res));
           } else if (this.maxPrice == 839666666) {
              this.httpService.get(this.url, {
               'catgId':this.idss,
               'search':this.key,
               'flag': '2',
               'minPrice': this.minPrice,
               'pageNum': this.pageNum,
               'pageSize': this.pageSize
               }
              ).then(
                res => this.handleSortSuccess(res));
             }else {
                this.httpService.get(this.url, {
                'catgId':this.idss,
                'search':this.key,
                'flag': '2',
                'minPrice': this.minPrice,
                'maxPrice': this.maxPrice,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
                }
               ).then(
                 res => this.handleSortSuccess(res));}
             }else{
                this.httpService.get(this.url, {
                  'catgId':this.idss,
                  'search':this.key,
                  'flag':'2',
                  'pageNum':this.pageNum,
                  'pageSize':this.pageSize
                }
               ).then(
                  res => this.handleSortSuccess(res));}
           }else if(!this.key){
                 this.firstChoice=1;
                 this.secondChoice=0;
                 this.thirdChoice=1;
                 this.pageNum=1;
                 if(this.fourthChoice==0){
                   this.shaiByTime=0;
                   if (this.minPrice == 839555555) {
                      this.httpService.get(this.url, {
                          'catgId':this.idss,
                          'flag': '2',
                          'maxPrice': this.maxPrice,
                          'pageNum': this.pageNum,
                          'pageSize': this.pageSize
                         }
                        ).then(
                         res => this.handleSortSuccess(res));
                   } else if (this.maxPrice == 839666666){
                      this.httpService.get(this.url, {
                        'catgId':this.idss,
                        'flag': '2',
                        'minPrice': this.minPrice,
                        'pageNum': this.pageNum,
                        'pageSize': this.pageSize
                      }
                      ).then(
                         res => this.handleSortSuccess(res));
                   }else{
                      this.httpService.get(this.url, {
                         'catgId':this.idss,
                         'flag': '2',
                         'minPrice': this.minPrice,
                         'maxPrice': this.maxPrice,
                         'pageNum': this.pageNum,
                         'pageSize': this.pageSize
                      }
                      ).then(
                         res => this.handleSortSuccess(res));}
                   }else{
                     console.log(this.pageSize);
                     this.httpService.get(this.url, {
                       'catgId':this.idss,
                       'flag':'2',
                       'pageNum':this.pageNum,
                       'pageSize':this.pageSize
                     }
                     ).then(
                       res => this.handleSortSuccess(res));}}
                   }else if(this.what==0||this.what==2){
                      if(this.key){
                        this.firstChoice=1;
                        this.secondChoice=0;
                        this.thirdChoice=1;
                        this.pageNum=1;
                        if(this.fourthChoice==0) {
                          this.shaiByTime=0;
                          if(this.minPrice == 839555555) {
                            this.httpService.get(this.url, {
                               'search':this.key,
                               'flag': '2',
                               'maxPrice': this.maxPrice,
                               'pageNum': this.pageNum,
                               'pageSize': this.pageSize
                               }
                            ).then(
                               res => this.handleSortSuccess(res));
                          }else if(this.maxPrice == 839666666){
                             this.httpService.get(this.url, {
                                'search':this.key,
                                'flag': '2',
                                'minPrice': this.minPrice,
                                'pageNum': this.pageNum,
                                'pageSize': this.pageSize
                              }
                             ).then(
                                res => this.handleSortSuccess(res));
                          }else{
                             this.httpService.get(this.url, {
                                 'search':this.key,
                                 'flag': '2',
                                 'minPrice': this.minPrice,
                                 'maxPrice': this.maxPrice,
                                 'pageNum': this.pageNum,
                                 'pageSize': this.pageSize
                               }
                             ).then(
                               res => this.handleSortSuccess(res));}
                          }else{
                                this.httpService.get(this.url, {
                                  'search':this.key,
                                  'flag':'2',
                                  'pageNum':this.pageNum,
                                  'pageSize':this.pageSize
                                }
                                ).then(
                                  res => this.handleSortSuccess(res));
                        }
                      }else if(!this.key){
                        this.firstChoice=1;
                        this.secondChoice=0;
                        this.thirdChoice=1;
                        this.pageNum=1;
                        if(this.fourthChoice==0){
                          this.shaiByTime=0;
                          if(this.minPrice == 839555555){
                            this.httpService.get(this.url, {
                              'flag': '2',
                              'maxPrice': this.maxPrice,
                              'pageNum': this.pageNum,
                              'pageSize': this.pageSize
                              }
                            ).then(
                                  res => this.handleSortSuccess(res));
                          }else if(this.maxPrice == 839666666){
                             this.httpService.get(this.url, {
                                'flag': '2',
                                'minPrice': this.minPrice,
                                'pageNum': this.pageNum,
                                'pageSize': this.pageSize
                             }
                             ).then(
                               res => this.handleSortSuccess(res));
                          }else{
                             this.httpService.get(this.url, {
                                'flag': '2',
                                'minPrice': this.minPrice,
                                'maxPrice': this.maxPrice,
                                'pageNum': this.pageNum,
                                'pageSize': this.pageSize
                             }
                             ).then(
                                res => this.handleSortSuccess(res));}
                          }else{
                             this.httpService.get(this.url, {
                               'flag':'2',
                               'pageNum':this.pageNum,
                               'pageSize':this.pageSize
                             }
                             ).then(
                               res => this.handleSortSuccess(res));
                        }
                      }
    }
  }
  //搜索成功后函数
  handleSortSuccess(result){
    this.pageNum++;
    console.log(result);
    if(result.data.length==0){
      this.httpService.presentToast("该区间无产品")
    }
    for(var i=0;i<result.data.length;i++){
      if(!result.data[i].imgPathList){
        result.data[i].imgPathList='../../assets/imgs/f1.jpg';
      }else if(result.data[i].imgPathList.length>1){
        result.data[i].imgPathList=result.data[i].imgPathList[0];
      }
      switch (result.data[i].hot){
        case 0:
          result.data[i].hot='低';
          break;
        case 1:
          result.data[i].hot= '热';
          break;
      }
      if(!result.data[i].currency){
        result.data[i].currency='￥';
      }
      switch (result.data[i].currency){
        case 'CNY':
          result.data[i].currency='￥';
          break;
        case 'USD':
          result.data[i].currency='$';
          break;
      }
    }
    this.products=result.data;
  }
  //根据价格排序搜索
  price(){
    if(this.what==1){
      if(this.key){
        this.firstChoice=1;
        this.secondChoice=1;
        this.thirdChoice=0;
        this.pageNum=1;
        if(this.fourthChoice==0) {
          this.shaiByPrice=0;
          if (this.minPrice == 839555555) {
            this.httpService.get(this.url, {
                'catgId':this.idss,
                'search':this.key,
                'flag': '1',
                'maxPrice': this.maxPrice,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
             ).then(
               res => this.handleSortSuccess(res));
          }else if(this.maxPrice == 839666666){
            this.httpService.get(this.url, {
                'catgId':this.idss,
                'search':this.key,
                'flag': '1',
                'minPrice': this.minPrice,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
              ).then(
                res => this.handleSortSuccess(res));
          }else{
            this.httpService.get(this.url, {
                'catgId':this.idss,
                'search':this.key,
                'flag': '1',
                'minPrice': this.minPrice,
                'maxPrice': this.maxPrice,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
              ).then(
                res => this.handleSortSuccess(res));}
          }else{
            this.httpService.get(this.url, {
              'catgId':this.idss,
              'search':this.key,
              'flag':'1',
              'pageNum':this.pageNum,
              'pageSize':this.pageSize}
            ).then(
              res => this.handleSortSuccess(res));}
      }else if(!this.key){
        this.firstChoice=1;
        this.secondChoice=1;
        this.thirdChoice=0;
        this.pageNum=1;
        if(this.fourthChoice==0) {
          this.shaiByPrice=0;
          if (this.minPrice == 839555555) {
            this.httpService.get(this.url, {
                'catgId':this.idss,
                'flag': '1',
                'maxPrice': this.maxPrice,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
              ).then(
                res => this.handleSortSuccess(res));
          }else if (this.maxPrice == 839666666){
            this.httpService.get(this.url, {
                'catgId':this.idss,
                'flag': '1',
                'minPrice': this.minPrice,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
              ).then(
                res => this.handleSortSuccess(res));
          }else{
            this.httpService.get(this.url, {
                'catgId':this.idss,
                'flag': '1',
                'minPrice': this.minPrice,
                'maxPrice': this.maxPrice,
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
              }
              ).then(
                res => this.handleSortSuccess(res));}
        }else{
          this.httpService.get(this.url, {
            'catgId':this.idss,
            'flag':'1',
            'pageNum':this.pageNum,
            'pageSize':this.pageSize
          }
          ).then(
            res => this.handleSortSuccess(res));
        }
      }
    }
    else if(this.what==0||this.what==2){
      if(this.key){
       this.firstChoice=1;
       this.secondChoice=1;
       this.thirdChoice=0;
       this.pageNum=1;
       if(this.fourthChoice==0) {
         this.shaiByPrice=0;
         if (this.minPrice == 839555555) {
           this.httpService.get(this.url, {
              'search':this.key,
              'flag': '1',
              'maxPrice': this.maxPrice,
              'pageNum': this.pageNum,
              'pageSize': this.pageSize
            }
           ).then(
            res => this.handleSortSuccess(res));
         }else if(this.maxPrice == 839666666){
           this.httpService.get(this.url, {
              'search':this.key,
              'flag': '1',
              'minPrice': this.minPrice,
              'pageNum': this.pageNum,
              'pageSize': this.pageSize
            }
            ).then(
             res => this.handleSortSuccess(res));
         }else{
           this.httpService.get(this.url, {
              'search':this.key,
              'flag': '1',
              'minPrice': this.minPrice,
              'maxPrice': this.maxPrice,
              'pageNum': this.pageNum,
              'pageSize': this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));}
         }else{
           this.httpService.get(this.url, {
             'search':this.key,
             'flag':'1',
             'pageNum':this.pageNum,
             'pageSize':this.pageSize
           }
           ).then(
             res => this.handleSortSuccess(res));}
    }else if(!this.key){
      this.firstChoice=1;
      this.secondChoice=1;
      this.thirdChoice=0;
      this.pageNum=1;
      if(this.fourthChoice==0) {
        this.shaiByPrice=0;
        if(this.minPrice == 839555555){
           this.httpService.get(this.url, {
              'flag': '1',
              'maxPrice': this.maxPrice,
              'pageNum': this.pageNum,
              'pageSize': this.pageSize
           }
           ).then(
             res => this.handleSortSuccess(res));
      }else if(this.maxPrice == 839666666){
         this.httpService.get(this.url, {
            'flag': '1',
            'minPrice': this.minPrice,
            'pageNum': this.pageNum,
            'pageSize': this.pageSize
          }
         ).then(
          res => this.handleSortSuccess(res));
      }else{
         this.httpService.get(this.url, {
            'flag': '1',
            'minPrice': this.minPrice,
            'maxPrice': this.maxPrice,
            'pageNum': this.pageNum,
            'pageSize': this.pageSize
          }
          ).then(
            res => this.handleSortSuccess(res));}
      }else{
         this.httpService.get(this.url, {
           'flag':'1',
           'pageNum':this.pageNum,
           'pageSize':this.pageSize
         }
         ).then(
           res => this.handleSortSuccess(res));}}
    }
  }
  //根据筛选区间搜索
  presentPopover(myEvent) {
    if(this.what==1){
      if(this.key){
        this.firstChoice=1;
        this.secondChoice=1;
        this.thirdChoice=1;
        this.fourthChoice=0;
        this.fourth=0;
        let popover = this.popoverCtrl.create('PopoverPage');
        popover.present({
          ev: myEvent
        });
        popover.onDidDismiss((minPrice,maxPrice) =>{
          if(minPrice==null&&maxPrice=='backdrop'){
            this.httpService.presentToast("请正确填写筛选区间");
            return
          }
          this.pageNum=1;
          this.maxPrice=parseFloat(maxPrice);
          this.minPrice=parseFloat(minPrice);
          if(this.minPrice==839555555){
            this.httpService.get(this.url, {
              'catgId':this.idss,
              'search':this.key,
              'maxPrice':this.maxPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }else if(this.maxPrice==839666666){
            this.httpService.get(this.url, {
              'catgId':this.idss,
              'search':this.key,
              'minPrice':this.minPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }else{
            this.httpService.get(this.url, {
              'catgId':this.idss,
              'search':this.key,
              'minPrice':this.minPrice,
              'maxPrice':this.maxPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }
        })
      }else if(!this.key){
        this.firstChoice=1;
        this.secondChoice=1;
        this.thirdChoice=1;
        this.fourthChoice=0;
        this.fourth=0;
        let popover = this.popoverCtrl.create('PopoverPage');
        popover.present({
          ev: myEvent
        });
        popover.onDidDismiss((minPrice,maxPrice) =>{
          if(minPrice==null&&maxPrice=='backdrop'){
            this.httpService.presentToast("请正确填写筛选区间");
            return
          }
          this.pageNum=1;
          this.maxPrice=parseFloat(maxPrice);
          this.minPrice=parseFloat(minPrice);
          if(this.minPrice==839555555){
            this.httpService.get(this.url, {
              'catgId':this.idss,
              'maxPrice':this.maxPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }else if(this.maxPrice==839666666){
            this.httpService.get(this.url, {
              'catgId':this.idss,
              'minPrice':this.minPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }else{
            this.httpService.get(this.url, {
              'catgId':this.idss,
              'minPrice':this.minPrice,
              'maxPrice':this.maxPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }
        })
      }
    }else if(this.what==0||this.what==2){
       if(this.key){
         this.firstChoice=1;
         this.secondChoice=1;
         this.thirdChoice=1;
         this.fourthChoice=0;
         this.fourth=0;
         let popover = this.popoverCtrl.create('PopoverPage');
         popover.present({
           ev: myEvent
         });
         popover.onDidDismiss((minPrice,maxPrice) =>{
           if(minPrice==null&&maxPrice=='backdrop'){
             this.httpService.presentToast("请正确填写筛选区间");
             return
          }
          this.pageNum=1;
          this.maxPrice=parseFloat(maxPrice);
          this.minPrice=parseFloat(minPrice);
          if(this.minPrice==839555555){
            this.httpService.get(this.url, {
              'search':this.key,
              'maxPrice':this.maxPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }else if(this.maxPrice==839666666){
            this.httpService.get(this.url, {
              'search':this.key,
              'minPrice':this.minPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }else{
            this.httpService.get(this.url, {
              'search':this.key,
              'minPrice':this.minPrice,
              'maxPrice':this.maxPrice,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize
            }
            ).then(
              res => this.handleSortSuccess(res));
          }
        })
       }else if(!this.key){
         this.firstChoice=1;
         this.secondChoice=1;
         this.thirdChoice=1;
         this.fourthChoice=0;
         this.fourth=0;
         let popover = this.popoverCtrl.create('PopoverPage');
         popover.present({
           ev: myEvent
         });
         popover.onDidDismiss((minPrice,maxPrice) =>{
           if(minPrice==null&&maxPrice=='backdrop'){
              this.httpService.presentToast("请正确填写筛选区间");
              return
           }
           this.pageNum=1;
           this.maxPrice=parseFloat(maxPrice);
           this.minPrice=parseFloat(minPrice);
           if(this.minPrice==839555555){
              this.httpService.get(this.url, {
                'maxPrice':this.maxPrice,
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
              }
             ).then(
               res => this.handleSortSuccess(res));
           }else if(this.maxPrice==839666666){
             this.httpService.get(this.url, {
               'minPrice':this.minPrice,
               'pageNum':this.pageNum,
               'pageSize':this.pageSize
             }
             ).then(
               res => this.handleSortSuccess(res));
           }else{
             this.httpService.get(this.url, {
               'minPrice':this.minPrice,
               'maxPrice':this.maxPrice,
               'pageNum':this.pageNum,
               'pageSize':this.pageSize
             }
           ).then(
             res => this.handleSortSuccess(res));
           }
        })
       }
    }
  }
  //点击查找按钮
  search(){
    this.flagOne=true;
  }
  //确定查找
  goSearch(){
    if(this.what==1){
      this.firstChoice=0;
      this.secondChoice=1;
      this.thirdChoice=1;
      this.fourthChoice=1;
      if(!this.key){
        this.httpService.presentToast("请输入产品名称查询")
      }else if(this.key){
        this.flagOne=false;
        this.httpService.get(this.url, {'catgId':this.idss,'search':this.key}
        ).then(
          res => this.handleSearchSuccess(res));
      }
    }else if(this.what==0) {
      this.firstChoice=0;
      this.secondChoice=1;
      this.thirdChoice=1;
      this.fourthChoice=1;
      if(!this.key){
        this.httpService.presentToast("请输入产品名称查询")
      }else if(this.key){
        this.flagOne=false;
        console.log(this.pageNum)
        this.httpService.get(this.url, {'search':this.key}
        ).then(
          res => this.handleSearchSuccess(res));
    }}
  }
  //查找成功后函数
  handleSearchSuccess(result){
    console.log(result);
    console.log(this.pageNum);
    this.pageNum++;
    if(result.data.length==0){
      this.httpService.presentToast("没有该产品")
    }
    for(var i=0;i<result.data.length;i++){
      if(!result.data[i].imgPathList){
        result.data[i].imgPathList='../../assets/imgs/f1.jpg';
      }else if(result.data[i].imgPathList.length>1){
        result.data[i].imgPathList=result.data[i].imgPathList[0];
      }
      switch (result.data[i].hot){
        case 0:
          result.data[i].hot='低';
          break;
        case 1:
          result.data[i].hot= '热';
          break;
      }
      if(!result.data[i].currency){
        result.data[i].currency='￥';
      }
      switch (result.data[i].currency){
        case 'CNY':
          result.data[i].currency='￥';
          break;
        case 'USD':
          result.data[i].currency='$';
          break;
      }
    }
    this.products=result.data
  }
}
