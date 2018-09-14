import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionPage } from './production';

@NgModule({
  declarations: [

    ProductionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionPage),
  ],
  // entryComponents: [
  //   ProductionPage
  // ]
})
export class ProductionPageModule {}
