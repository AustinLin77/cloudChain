import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasingManagementPage } from './purchasing-management';

@NgModule({
  declarations: [
    PurchasingManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasingManagementPage),
  ],
})
export class PurchasingManagementPageModule {}
