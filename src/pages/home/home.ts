import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dayofweeks = ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"];
  months = [];
  numberSelected: number = 5;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mModalController: ModalController) {
    var dem = 1;
    for (let index = 0; index < 42; index++) {

      if (index > 3 && index < 35) {
        this.months.push(dem);
        dem++;
      } else {
        this.months.push(null);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  changeNumber(number) {
    this.numberSelected = number;
  }
  goToMenu() {
    let modal = this.mModalController.create("MenuPage");
    modal.present();
  }
  goToOrder() {
    let modal = this.mModalController.create("OrderOnlinePage");
    modal.present();
  }
  goToTeam() {
    let modal = this.mModalController.create("TeamPage");
    modal.present();
  }
  goToContact() {
    let modal = this.mModalController.create("ContactPage");
    modal.present();
  }
  goToBar(){
    let modal = this.mModalController.create("BarPage");
    modal.present();
  }
}
