import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutboundManagementPage } from './outbound-management';

@NgModule({
  declarations: [
    OutboundManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(OutboundManagementPage),
  ],
})
export class OutboundManagementPageModule {}
