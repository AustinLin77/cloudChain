import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopListComfirmPage } from './shop-list-comfirm';

@NgModule({
  declarations: [
    ShopListComfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopListComfirmPage),
  ],
})
export class ShopListComfirmPageModule {}
