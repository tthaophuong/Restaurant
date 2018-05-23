import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the OrderOnlinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-online',
  templateUrl: 'order-online.html',
})
export class OrderOnlinePage {
  isAddStart: boolean = false;
  isAddMain: boolean = false;
  isAddDessert: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mModalController: ModalController) {
    this.isAddStart = false;
    this.isAddMain = false;
    this.isAddDessert = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderOnlinePage');
  }
  foodDetail() {
    let modal = this.mModalController.create("FoodDetailPage");
    modal.present();
  }
  // addClassStart() {
  //   this.isAddStart = !this.isAddStart;
  // }
  addClassMain() {
    this.isAddMain = !this.isAddMain;
  }

}
