import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsdetailsPage } from './goodsdetails';

@NgModule({
  declarations: [
    GoodsdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsdetailsPage),
  ],
})
export class GoodsdetailsPageModule {}
