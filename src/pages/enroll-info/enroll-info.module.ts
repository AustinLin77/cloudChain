import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnrollInfoPage } from './enroll-info';

@NgModule({
  declarations: [
    EnrollInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnrollInfoPage),
  ],
})
export class EnrollInfoPageModule {}
