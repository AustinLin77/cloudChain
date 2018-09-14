import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasingManagementListDetailPage } from './purchasing-management-list-detail';

@NgModule({
  declarations: [
    PurchasingManagementListDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasingManagementListDetailPage),
  ],
})
export class PurchasingManagementListDetailPageModule {}
