import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseDetailsPage } from './purchase-details';

@NgModule({
  declarations: [
    PurchaseDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseDetailsPage),
  ],
})
export class PurchaseDetailsPageModule {}
