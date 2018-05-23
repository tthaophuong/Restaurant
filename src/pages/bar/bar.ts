import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bar',
  templateUrl: 'bar.html',
})
export class BarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarPage');
  }
  slides = [
    {
      image: "assets/imgs/bar-1635318817634412745.jpg",
    },
    {
      image: "assets/imgs/maxresdefault (1).jpg",
    },
    {
      image: "assets/imgs/maxresdefault (2).jpg",
    }
  ];

}
