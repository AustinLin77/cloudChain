import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyShopListPage } from './my-shop-list';

@NgModule({
  declarations: [
    MyShopListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyShopListPage),
  ],
})
export class MyShopListPageModule {}
