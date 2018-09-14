import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyApplyPage } from './my-apply';

@NgModule({
  declarations: [
    MyApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyApplyPage),
  ],
})
export class MyApplyPageModule {}
