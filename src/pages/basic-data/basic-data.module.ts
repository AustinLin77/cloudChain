import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasicDataPage } from './basic-data';

@NgModule({
  declarations: [
    BasicDataPage,
  ],
  imports: [
    IonicPageModule.forChild(BasicDataPage),
  ],
})
export class BasicDataPageModule {}
