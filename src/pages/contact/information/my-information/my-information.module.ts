import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyInformationPage } from './my-information';

@NgModule({
  declarations: [
    MyInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(MyInformationPage),
  ],
})
export class MyInformationPageModule {}
