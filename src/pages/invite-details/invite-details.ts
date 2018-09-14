import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpService } from '../../service/HttpService';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {Device} from "@ionic-native/device"
/**
 * Generated class for the InviteDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite-details',
  templateUrl: 'invite-details.html',
})
export class InviteDetailsPage {
  data={};
  inviteId;
  downLoadUrl='';
  type='';
  fileType='';
  loading;
  myloading;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService,private transfer: FileTransfer,
              private file: File,private fileOpener: FileOpener,private device : Device,public loadCtrl: LoadingController) {
  }
  loadingStart(){
    this.myloading = this.loadCtrl.create({
      content:'loading'
    });
    this.myloading.present();
  }
  hideLoading(){
    this.myloading.dismiss()
  }
  ngOnInit():void{
    this.inviteId=this.navParams.data.id;
    var url='/no/filter/app/bidding/detail/';
    url+=this.inviteId;
    this.httpService.get(url,{}
    ).then(
      res => this.handleSuccess(res));
  }
  handleSuccess(result){
    console.log(result);
    this.data=result.data;
  }
  //附件下载
  downLoad(){
    let url='/files/download/';
    url+=this.inviteId;
    this.httpService.getOrganize(url, {}
    ).then(
      res => this.handleDownSuccess(res));
  }
  handleDownSuccess(result){
    console.log(result);
    this.downLoadUrl=result;
    window.location.href=this.downLoadUrl;
  }

}
