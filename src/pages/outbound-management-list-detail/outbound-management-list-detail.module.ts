import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutboundManagementListDetailPage } from './outbound-management-list-detail';

@NgModule({
  declarations: [
    OutboundManagementListDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OutboundManagementListDetailPage),
  ],
})
export class OutboundManagementListDetailPageModule {}
