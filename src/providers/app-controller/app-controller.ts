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
}
