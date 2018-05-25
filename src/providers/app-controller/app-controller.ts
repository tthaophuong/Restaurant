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
        src: "./assets/imgs/food1.jpg",
        name: "This Is Your Item's Name",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 23
      },
      {
        id: "#2",
        src: "./assets/imgs/food1.jpg",
        name: "This Is Your Item's Name",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 10
      },
      {
        id: "#3",
        src: "./assets/imgs/food1.jpg",
        name: "This Is Your Item's Name",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 5
      }
    ]
  }
  getMainData(){
    return [
      {
        id: "#4",
        src: "./assets/imgs/food2.webp",
        name: "This Is Your Item's Name",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 23
      },
      {
        id: "#5",
        src: "./assets/imgs/food2.webp",
        name: "This Is Your Item's Name",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 10
      },
      {
        id: "#6",
        src: "./assets/imgs/food2.webp",
        name: "This Is Your Item's Name",
        subcontent: "Penne aglio e olio, with fresh garlic, herbs & cheese, topped with basil",
        money: 5
      }
    ]
  }


}
