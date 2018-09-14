import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierManagementPage } from './supplier-management';

@NgModule({
  declarations: [
    SupplierManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierManagementPage),
  ],
})
export class SupplierManagementPageModule {}
