import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyInPurchasePage } from './my-in-purchase';

@NgModule({
  declarations: [
    MyInPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(MyInPurchasePage),
  ],
})
export class MyInPurchasePageModule {}
