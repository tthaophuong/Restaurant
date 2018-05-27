import { Injectable } from '@angular/core';
import { Calendar } from '../calendar';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the AppControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppControllerProvider {

  constructor(
    private mToasController: ToastController
  ) {
    console.log('Hello AppControllerProvider Provider');
  }

  public _createCalendar(): Calendar{
    let today = new Date();
    return new Calendar(today.getMonth()+ 1,today.getFullYear());
  } 

  showToast(message: string, duration?:number,position?:string){
    this.mToasController.create({
      message: message,
      duration: duration ? duration : 3000,
      position : position ? position : "bottom"
    }).present();
  }

  getStarterData(){
    return [
      {
        id: "#1",
        src: "./assets/imgs/RFO-BeetrootChickpeaBites-1400x919-v2-754111cd-54eb-4e65-8712-0adc3594f53a-0-1400x919.jpg",
        name: "Spring-roll",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 23
      },
      { 
        id: "#2",
        src: "./assets/imgs/c700x420.jpg",
        name: "Pizza",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 15
      },
      {
        id: "#3",
        src: "./assets/imgs/photos-2013-12-16-8-23-14.jpg",
        name: "Seekh Kabab",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 10
      }
    ]
  }
  getMainData(){
    return [
      {
        id: "#4",
        src: "./assets/imgs/food2.webp",
        name: "Shrimp Fingers",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 23
      },
      {
        id: "#5",
        src: "./assets/imgs/556e81a361e36091e8a3edb8fff598c5.webp",
        name: "Shrimp Fillet",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 10
      },
      {
        id: "#6",
        src: "./assets/imgs/restaurant-gallery-4.jpg",
        name: "Whole fish Paratha",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 5
      }
    ]
  }


}
