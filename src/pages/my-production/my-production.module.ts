import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProductionPage } from './my-production';

@NgModule({
  declarations: [
    MyProductionPage,
  ],
  imports: [
    IonicPageModule.forChild(MyProductionPage),
  ],
})
export class MyProductionPageModule {}
