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

  parse(food: Foods): Foods{
    let newFood = new Foods();
    newFood.id = food.id;
    newFood.name = food.name;
    newFood.quantity = food.quantity;
    newFood.price = food.price;
    newFood.src = food.src;
    newFood.subcontent = food.subcontent;
    newFood.special_request = food.special_request;
    return newFood;
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

  /**Chọn starters hoặc mains trong menu */
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

  /**Hiển thị menu bằng cách dịch chuyển nó từ trái sang phải về vị trí chính xác ban đầu của nó*/
  showMenu() {
    let ele = document.getElementById("menu");
    if (ele) {
      ele.style.transform = "translateX(0)";
    }
  }

  /**Ẩn menu bằng cách dịch chuyển nó từ phải sang trái 1 khoảng cách bằng 120% chiều rộng của nó */
  closeMenu() {
    let ele = document.getElementById("menu");
    if (ele) {
      ele.style.transform = "translateX(-120%)";
    }
  }

  /** Hiển thị popup Chi tiết món ăn */
  showDetail() {
    let ele = document.getElementById("detail");
    if (ele) {
      ele.style.display = "block";
    }
  }

  /** Ẩn popup Chi tiết món ăn */
  
  hideDetail() {
    let ele = document.getElementById("detail");
    if (ele) {
      ele.style.display = "none";
    }
  }

  /**Tăng số lượng của món ăn đang chọn lên 1 */
  addQuantiy() {
    this.foodSelected.quantity++;
  }

  /**Giảm số lượng của món ăn đang chọn lên 1 */
  removeQuantity() {
    if (this.foodSelected.quantity > 0) {
      this.foodSelected.quantity--;
    }
  }

  /**Sau khi click vào 1 món ăn
   * - set up dữ liệu món cho món ăn đang được chọn để hiển thị lên popup
   * - Nếu món đó đã có trong order thì set số lượng và special request đúng với trong order, nếu chưa xuất hiện trong order thì để về 0
   * - Sau khi parse giá trị cho object xong thì hiển thị popup lên màn hình
   */
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


  /** Thêm món đã chọn vào order
   * - Nếu món ăn được chọn đã có trong order(Kết quả tìm index của nó trong danh sách món đã chọn trong order sẽ trả về giá trị lớn hơn -1) 
   *   gán gía trị của object đang chọn cho phần tử ở vị trí index đã tìm được
   * - Nếu món ăn chưa có trong order(index = -1) Copy gía trị object hiện tại đang chọn và tạo ra 1 object (Foods) mới rồi add vào danh sách món trong order
   */
  addFoodToOrder(){
    
    let index = this.order.listFoods.findIndex(food=>{
      return food.id == this.foodSelected.id;
    })
    if(index > -1){
      this.order.listFoods[index]= this.foodSelected;
    }else{
      this.order.listFoods.push(this.foodSelected.parse(this.foodSelected));
    }
    
    this.hideDetail();
  }

  /**Hiển thị thông báo đã order thành công */
  orderNow(){
    this.mAppController.showToast("Bạn đã order thành công");
  }

  /**Giảm số lượng ón ăn đang hover đi 1 */
  removeQuantityFood(food: Foods){
    if(food.quantity > 0)food.quantity--;
  }

  /**Tăng số lượng ón ăn đang hover đi 1 */
  addQuantityFood(food){
    food.quantity++;
  }

  /**Xóa món ăn đang hover đi nếu số lượng của nó bằng 1*/
  deleteFood(food: Foods){
    let index = this.order.listFoods.findIndex(foodd=>{
      return food.id == foodd.id;
    })
    if(index > -1){
      this.order.listFoods.splice(index,1);
    }
  }

  isShowInputSpecial: boolean = false;
  /**Hiển thị ô input nhập special request trong popup detail food*/
  showInputSpecial(){
    this.isShowInputSpecial = true;
  }
  isShowOrderSpecialInput: boolean = false;
  /**Hiển thị ô input nhập special request bên cột order bên phải*/
  showOrderSpecial(){
    this.isShowOrderSpecialInput = true;
    setTimeout(() => {
      this.inPutOrderSpecial.setFocus();
    }, 150);
  }

  /** Sau khi không focus vào ô nhập special-request của cột order
   * - Nếu không nhập giá trị nào vào ô input thì ẩn ô nhập đi
   */
  speialBlur(){
    if(!this.order.special_request || this.order.special_request.length == 0){
      this.isShowOrderSpecialInput = false;
    }
  }
}
