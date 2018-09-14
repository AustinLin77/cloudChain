import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerManageDetailPage } from './customer-manage-detail';

@NgModule({
  declarations: [
    CustomerManageDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerManageDetailPage),
  ],
})
export class CustomerManageDetailPageModule {}
