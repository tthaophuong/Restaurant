import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  message: string = "";
  address: string = "";
  name: string = "";
  constructor(
    public mAppController : AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMessage(){
    this.mAppController.showToast("Chúng tôi đã nhận được phản hồi của bạn. Xin cám ơn !",2000,"top");
    this.message = "";
    this.address = "";
    this.name= "";
  }
}
