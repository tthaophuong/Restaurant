import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the OrderOnlinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class Orders {
  id: string;
  name: string;
  listFoods: Array<Foods>;
  totalMoney: number;
  special_request: string;
  constructor() {
    this.id = "";
    this.name = "My Order";
    this.listFoods = [];
    this.totalMoney = 0;
    this.special_request = "";
  }

  getTotalMoney(): number {
    this.totalMoney = 0;
    for (let i = 0; i < this.listFoods.length; i++) {
      this.totalMoney += this.listFoods[i].getTotalMoney();
    }
    return this.totalMoney;
  }

  getTotalItems(): number {
    let sum = 0;
    this.listFoods.forEach(food => {
      sum += food.quantity;
    })
    return sum;
  }
}

export class Foods {
  id: string;
  name: string;
  quantity: number;
  price: number;
  src: string;
  subcontent: string;
  special_request: string;
  constructor() {
    this.id = "";
    this.name = "Lorem";
    this.quantity = 0;
    this.price = 10;
    this.src = "./assets/imgs/food1.jpg";
    this.subcontent = "";
    this.special_request = "";
  }

  getTotalMoney(): number {
    return this.price * this.quantity;
  }

  setName(name: string) {
    this.name = name;
  }

  setPrice(price: number) {
    this.price = price;
  }

  setQuanity(quantity: number) {
    this.quantity = quantity;
  }

  setSrc(src: string) {
    this.src = src;
  }

  setSubContent(subcontent: string) {
    this.subcontent = subcontent;
  }
}

@IonicPage()
@Component({
  selector: 'page-order-online',
  templateUrl: 'order-online.html',
})
export class OrderOnlinePage {
  @ViewChild("inPutOrderSpecial") inPutOrderSpecial;
  isAddStart: boolean = false;
  isAddMain: boolean = false;
  isAddDessert: boolean = false;

  menu: Array<{ menuSelected: string, subMenu: string }> = [];
  menuSelected: any;
  index: number = 0;
  items: Array<any> = [];
  order: Orders;
  foodSelected: Foods;
  constructor(
    public mAppController: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams, public mModalController: ModalController) {
    this.isAddStart = false;
    this.isAddMain = false;
    this.isAddDessert = false;
    this.order = new Orders();
    this.foodSelected = new Foods();
    this.menu = [
      {
        menuSelected: "starters",
        subMenu: "This is a section of your menu, customize it any way you want."
      },
      {
        menuSelected: "mains",
        subMenu: "Tell people more about the items in this section, e.g., all main courses can be made gluten free"
      }
    ];
    this.menuSelected = this.menu[this.index];
  }

  ionViewDidLoad() {
    this.items = this.mAppController.getStarterData();
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

  changeIndex(number) {
    this.index = number;
    this.menuSelected = this.menu[this.index];
    this.closeMenu();
    if (this.index == 0) {
      this.items = this.mAppController.getStarterData();
    } else {
      this.items = this.mAppController.getMainData();
    }
  }

  showMenu() {
    let ele = document.getElementById("menu");
    if (ele) {
      ele.style.transform = "translateX(0)";
    }
  }

  closeMenu() {
    let ele = document.getElementById("menu");
    if (ele) {
      ele.style.transform = "translateX(-120%)";
    }
  }

  showDetail() {
    let ele = document.getElementById("detail");
    if (ele) {
      ele.style.display = "block";
    }
  }

  hideDetail() {
    let ele = document.getElementById("detail");
    if (ele) {
      ele.style.display = "none";
    }
  }

  addQuantiy() {
    this.foodSelected.quantity++;
  }

  removeQuantity() {
    if (this.foodSelected.quantity > 0) {
      this.foodSelected.quantity--;
    }
  }

  selectedFood(item){
    this.foodSelected.setName(item.name);
    this.foodSelected.setPrice(item.money);
    this.foodSelected.setSrc(item.src);
    this.foodSelected.setSubContent(item.subcontent);
    this.foodSelected.id = item.id;
    let index = this.order.listFoods.findIndex(food=>{
      return food.id == this.foodSelected.id;
    })
    if(index > -1){
      this.foodSelected.setQuanity(this.order.listFoods[index].quantity);
      if(this.order.listFoods[index].special_request && this.order.listFoods[index].special_request.length > 0){
        this.foodSelected.special_request = this.order.listFoods[index].special_request;
      }
    }else{
      this.foodSelected.setQuanity(0);
      this.isShowInputSpecial = false;
    }
    this.showDetail();
  }

  addFoodToOrder(){
    let index = this.order.listFoods.findIndex(food=>{
      return food.id == this.foodSelected.id;
    })
    if(index > -1){
      this.order.listFoods[index]= this.foodSelected;
    }else{
      this.order.listFoods.push(this.foodSelected);
    }
    this.hideDetail();
  }

  orderNow(){
    this.mAppController.showToast("Bạn đã order thành công");
  }
  removeQuantityFood(food: Foods){
    if(food.quantity > 0)food.quantity--;
  }

  addQuantityFood(food){
    food.quantity++;
  }

  deleteFood(food: Foods){
    let index = this.order.listFoods.findIndex(foodd=>{
      return food.id == foodd.id;
    })
    if(index > -1){
      this.order.listFoods.splice(index,1);
    }
  }
  isShowInputSpecial: boolean = false;
  showInputSpecial(){
    this.isShowInputSpecial = true;
  }
  isShowOrderSpecialInput: boolean = false;
  showOrderSpecial(){
    this.isShowOrderSpecialInput = true;
    setTimeout(() => {
      this.inPutOrderSpecial.setFocus();
    }, 150);
  }

  speialBlur(){
    if(!this.order.special_request || this.order.special_request.length == 0){
      this.isShowOrderSpecialInput = false;
    }
  }
}
