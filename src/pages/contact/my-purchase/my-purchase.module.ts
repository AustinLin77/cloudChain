import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPurchasePage } from './my-purchase';

@NgModule({
  declarations: [
    MyPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(MyPurchasePage),
  ],
})

export class MyPurchasePageModule {}
