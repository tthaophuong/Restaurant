import { Injectable } from '@angular/core';
import { Calendar } from '../calendar';

/*
  Generated class for the AppControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppControllerProvider {

  constructor() {
    console.log('Hello AppControllerProvider Provider');
  }

  public _createCalendar(): Calendar{
    let today = new Date();
    return new Calendar(today.getMonth()+ 1,today.getFullYear());
  } 
}
