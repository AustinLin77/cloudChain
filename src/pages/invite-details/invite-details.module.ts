import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteDetailsPage } from './invite-details';

@NgModule({
  declarations: [
    InviteDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteDetailsPage),
  ],
})
export class InviteDetailsPageModule {}
