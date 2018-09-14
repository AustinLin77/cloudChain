import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorageManagementPage } from './storage-management';

@NgModule({
  declarations: [
    StorageManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(StorageManagementPage),
  ],
})
export class StorageManagementPageModule {}
