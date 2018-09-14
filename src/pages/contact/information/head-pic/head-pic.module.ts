import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeadPicPage } from './head-pic';

@NgModule({
  declarations: [
    HeadPicPage,
  ],
  imports: [
    IonicPageModule.forChild(HeadPicPage),
  ],
})
export class HeadPicPageModule {}
