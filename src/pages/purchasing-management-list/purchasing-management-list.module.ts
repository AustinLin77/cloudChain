import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasingManagementListPage } from './purchasing-management-list';

@NgModule({
  declarations: [
    PurchasingManagementListPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasingManagementListPage),
  ],
})
export class PurchasingManagementListPageModule {}
