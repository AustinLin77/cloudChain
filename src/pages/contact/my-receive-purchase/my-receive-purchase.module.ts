import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyReceivePurchasePage } from './my-receive-purchase';

@NgModule({
  declarations: [
    MyReceivePurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(MyReceivePurchasePage),
  ],
})
export class MyReceivePurchasePageModule {}
