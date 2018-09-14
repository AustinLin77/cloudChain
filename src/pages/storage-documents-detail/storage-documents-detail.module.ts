import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorageDocumentsDetailPage } from './storage-documents-detail';

@NgModule({
  declarations: [
    StorageDocumentsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StorageDocumentsDetailPage),
  ],
})
export class StorageDocumentsDetailPageModule {}
