import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotationDetailsPage } from './quotation-details';

@NgModule({
  declarations: [
    QuotationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotationDetailsPage),
  ],
})
export class QuotationDetailsPageModule {}
