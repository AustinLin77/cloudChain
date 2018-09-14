import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadUrlPage } from './download-url';

@NgModule({
  declarations: [
    DownloadUrlPage,
  ],
  imports: [
    IonicPageModule.forChild(DownloadUrlPage),
  ],
})
export class DownloadUrlPageModule {}
