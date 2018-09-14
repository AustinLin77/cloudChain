import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorageDocumentsPage } from './storage-documents';

@NgModule({
  declarations: [
    StorageDocumentsPage,
  ],
  imports: [
    IonicPageModule.forChild(StorageDocumentsPage),
  ],
})
export class StorageDocumentsPageModule {}
