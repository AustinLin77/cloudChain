import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerManagePage } from './customer-manage';

@NgModule({
  declarations: [
    CustomerManagePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerManagePage),
  ],
})
export class CustomerManagePageModule {}
