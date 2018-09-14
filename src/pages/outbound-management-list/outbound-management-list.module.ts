import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutboundManagementListPage } from './outbound-management-list';

@NgModule({
  declarations: [
    OutboundManagementListPage,
  ],
  imports: [
    IonicPageModule.forChild(OutboundManagementListPage),
  ],
})
export class OutboundManagementListPageModule {}
