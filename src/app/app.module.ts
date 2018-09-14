import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { ConfirmPage} from '../pages/confirm/confirm';
 import { ShopListPage } from '../pages/about/shopList';
// import { ShopListComfirmPage} from "../pages/shop-list-comfirm/shop-list-comfirm"
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// import { ProductionPage} from '../pages/production/production';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { GoodsdetailsPage} from '../pages/goodsdetails/goodsdetails';
import { HttpService } from '../service/HttpService';
import { HttpModule} from '@angular/http';

 // import { LoginPage } from '../pages/login/login';
// import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
// import { SuppliersDetailsPage} from '../pages/suppliers-details/suppliers-details';
// import { SubmitStatusPage} from '../pages/submit-status/submit-status';
// import { OrderDetailsPage} from '../pages/order-details/order-details';
import { GlobalVariable} from '../globalVariable/globalVariable';
 // import { ApplyPage} from '../pages/apply/apply';
// import { ApplyDetailsPage} from '../pages/apply-details/apply-details';
// import { QuotationPage} from '../pages/quotation/quotation';
// import { PurchasePage} from '../pages/purchase/purchase';
// import { PurchaseDetailsPage} from '../pages/purchase-details/purchase-details';
// import { InvitePage} from '../pages/invite/invite';
// import {PurchaseStatusPage} from "../pages/purchase-status/purchase-status"
 import { ContactPage} from "../pages/contact/contact";
import {Device} from "@ionic-native/device";
// import { InviteDetailsPage} from "../pages/invite-details/invite-details"
// import {MyPurchasePage} from "../pages/contact/my-purchase/my-purchase"
import { FileTransfer} from "@ionic-native/file-transfer"
import { FileOpener} from "@ionic-native/file-opener"
import { File} from "@ionic-native/file"
 // import { ApplyPage} from "../pages/apply/apply"
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
@NgModule({


  declarations: [

    MyApp,
     ShopListPage,
    ContactPage,
    HomePage,
    TabsPage,
     // LoginPage,
    // ForgetPasswordPage,
    // ProductionPage,
    // GoodsdetailsPage,
    // SuppliersDetailsPage,
    // ConfirmPage,
    // SubmitStatusPage,
    // OrderDetailsPage,
    // ApplyPage,
    // ApplyDetailsPage,
    // QuotationPage,
    // PurchasePage,
    // PurchaseDetailsPage,
    // InvitePage,
    // PurchaseStatusPage,
    // ShopListComfirmPage,
    // InviteDetailsPage,
    //  MyPurchasePage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ionicGalleryModal.GalleryModalModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
     ShopListPage,
     ContactPage,
    HomePage,
    TabsPage,
    // LoginPage,
    // ForgetPasswordPage,
    // ProductionPage,
    // GoodsdetailsPage,
    // SuppliersDetailsPage,
    // ConfirmPage,
    // SubmitStatusPage,
    // OrderDetailsPage,
    // ApplyPage,
    // ApplyDetailsPage,
    // QuotationPage,
    // PurchasePage,
    // PurchaseDetailsPage,
    // InvitePage,
    // PurchaseStatusPage,
    // ShopListComfirmPage,
    // InviteDetailsPage,
    // MyPurchasePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    GlobalVariable,
    FileTransfer,
    File,
    FileOpener,
    PhotoViewer,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
  ]
})
export class AppModule {}
