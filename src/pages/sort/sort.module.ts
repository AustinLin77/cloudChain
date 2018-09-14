import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SortPage } from './sort';

@NgModule({
  declarations: [
    SortPage,
  ],
  imports: [
    IonicPageModule.forChild(SortPage),
  ],
})
export class SortPageModule {}
