import { Component } from '@angular/core';
import { NavParams,Events } from 'ionic-angular';
import { ShopListPage } from '../about/shopList';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { HttpService} from '../../service/HttpService';
@Component({

  templateUrl: 'tabs.html'
})
export class TabsPage {
  showCancel:boolean=false
  myIndex :number;
  tab1Root = HomePage;
  tab2Root = ShopListPage;
  tab3Root = ContactPage;
  constructor( public navParams: NavParams,private httpService:HttpService, public events: Events) {
    events.subscribe('pop:showCancel', (number)=>{
      console.log(number);
      if(number==0){
        this.showCancel=true
      }else{
        this.showCancel=false
      }
    })
  }
  //初始化获得tab页应该在哪一个的标识
  ngOnInit():void {
    if(!this.navParams.data.myindex){
      this.myIndex=0;
      console.log(this.myIndex)
    }else{
      this.myIndex=this.navParams.data.myindex;
      console.log(this.myIndex)
    }
  }
}
