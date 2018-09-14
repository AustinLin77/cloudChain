import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseStatusPage } from './purchase-status';

@NgModule({
  declarations: [
    PurchaseStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseStatusPage),
  ],
})
export class PurchaseStatusPageModule {}

