import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuppliersDetailsPage } from './suppliers-details';

@NgModule({
  declarations: [
    SuppliersDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SuppliersDetailsPage),
  ],
})
export class SuppliersDetailsPageModule {}
