import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Calendar, Day } from '../../providers/calendar';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Untils } from '../../providers/untils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild("input") myInput;
  @ViewChild("input2") myInput2;
  @ViewChild("inputPhone") inputPhone;
  dayofweeks = ["M", "T", "W", "T", "F", "S", "S"];
  months = [];
  numberSelected: number = 5;
  calendar: Calendar;
  date: string = "--Date--";
  numberPeopleString: string = "Number people";
  number_people: number;
  isFullOption: boolean = false;
  today: Date;
  times: Array<string> = [];
  constructor(
    private mAppController: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams, public mModalController: ModalController) {
    this.calendar = new Calendar();
    this.calendar = this.mAppController._createCalendar();
    this.today = new Date();
    this.numberSelected = this.today.getDate();
    this.date = Untils.convertDateString(this.calendar.year, this.calendar.month, this.numberSelected);
  }
  isShowInput: boolean = false;
  /**Chọn số lượng người
   * - Ẩn dropdown
   * - Nếu chọn other thì hiển thị ô nhập và focus vào ô input đó
   * - Nếu chọn số người thiết lập sẵn thì hiển thị số người tương ứng
   * - Kiểm tra xem đã đủ thông tin cần thiết để order hay chưa
   */
  seclecPeople(number) {
    this.isShowPeople = false;
    if (number == 0) {
      this.isShowInput = true;
      setTimeout(() => {
        this.myInput.setFocus();
      }, 150);
    }
    if (number > 0) {
      this.numberPeopleString = number + "-" + number * 2 + " people";
      this.checkFullOption();
    }
  }
  /**Sau khi thoát khỏi trạng thái nhập input
   * - Hiển thị số người đã chọn
   * - Kiểm tra xem đã đủ thông tin cần thiết để order hay chưa
   */
  onBlur($event) {
    this.isShowInput = false;
    this.numberPeopleString = this.number_people + " people";
    this.checkFullOption();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
    this._createTimeListToDay();
  }


  /**Tạo giá trị trong dropdown thời gian
   * ngày hôm nay
   * - Nếu giờ hiện tại lớn hơn 9h thì khởi tạo từ giá trị giờ hiện tại
   */
  _createTimeListToDay() {
    let min = 9;
    let max = 21;
    let now = new Date();
    if (now.getHours() > min) {
      min = now.getHours();
    }
    this.creatTimeList(min, max, now);
  }

  /**Bắt sự kiên khi nhập số lượng người
   * - Giá trị trên ô input max là 35 và độ dài chuỗi hiển thị tối đa là 2 nhập quá thi cắt chuỗi từ vị trí 0 đến vị trí thứ 2 trong chuỗi
   */
  inPut($event) {

    let number_string = this.myInput.value;
    console.log(this.myInput);

    this.number_people = parseInt(number_string);
    if (number_string.length > 2) {
      this.myInput.value = number_string.substr(0, 2);
      this.number_people = parseInt(number_string);
    }
    console.log(this.number_people);

    if (this.number_people > 35) {
      if (number_string.length < 3) {
        this.myInput.value = number_string.substr(0, 1);
      } else {
        this.myInput.value = number_string.substr(0, 2);
      }
      this.number_people = parseInt(this.myInput.value);
    }
  }

  /**Chọn ngày trong danh sách ngày
   * Nếu ngày là ngày hiện tại chạy khởi taọ giá trị theo thời gian hiện tại
   * Nếu là ngày hôm sau thì khởi tạo mặc định từ 9-21h
   */
  changeNumber(day: Day) {
    this.isShowDate = false;
    if (day != null && day.dayNumber >= this.today.getDate()) {
      this.numberSelected = day.dayNumber;
      this.date = Untils.convertDateString(this.calendar.year, this.calendar.month, this.numberSelected);
      if (this.numberSelected == this.today.getDate()) {
        this._createTimeListToDay();
      } else {
        this.creatTimeList(9, 21);
      }
    }
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
  creatTimeList(min, max, now?: Date) {
    this.times = [];
    for (let i = min; i <= max; i++) {
      if (!now && i == min) {
        this.times.push(i + "h00");
        this.times.push(i + "h30");
      }
      if (now && i == min && now.getMinutes() < 30) {
        this.times.push(min + "h30");
      }
      if (i > min && i < max) {
        this.times.push(i + "h00");
        this.times.push(i + "h30");
      }
      if (i == max) {
        this.times.push(i + "h00");
      }
    }
  }

  time: string = "Time";
  seclecTime(time) {
    this.isShowTime = false;
    this.time = time;
    this.checkFullOption();
  }

  checkFullOption() {
    if (this.time != "Time" && this.numberPeopleString != "Number people" ) {
      this.isFullOption = true;
      return;
    }
    this.isFullOption = false;
  }
  /**Sau khi đầy đủ giá trị cần thiết lập button sẽ được sáng lên
   * Click -> Hiển thị thông báo đặt bàn thành công và reset toàn bộ option đã lựa chọn
   */
  book(){
    this.mAppController.showToast("Bạn đã đặt chỗ bàn thành công");
    this.resetAll();
  }

  /**Bắt sự kiện khi nhập số điện thoại */
  inPhone($event){
    let phoneNumber = this.inputPhone.value+"";
    if(phoneNumber.length > 11){
      this.inputPhone.value = phoneNumber.substr(0,11);
    }
  }

  isShowDate: boolean = false;
  /**Hiển thị dropdown ngày tháng */
  showDetail(){
    this.isShowDate = !this.isShowDate;
    this.isShowTime = false;
    this.isShowPeople = false;
  }
  isShowTime: boolean = false;
  /**Hiển thị dropdown chọn giờ */
  showTime(){
    this.isShowTime = !this.isShowTime;
    this.isShowDate = false;
    this.isShowPeople = false;
    if(this.times.length == 0 && this.isShowTime){
      this.isShowTime = false;
      this.mAppController.showToast("Chúng tôi chỉ nhận đặt chỗ từ 9h00-21h00");
    }
  }
  isShowPeople
  /**Hiển thị dropdown chọn số lượng người */
  showPeople(){
    this.isShowPeople = !this.isShowPeople;
    this.isShowDate = false;
    this.isShowTime = false;
  } 
  /**Reset toàn bộ option đã lựa chọn về mặc định */
  resetAll(){
    this.time = "Time";
    this.numberPeopleString = "Number people";
    this.inputPhone.value = "";
    let today = new Date();
    this.date = Untils.convertDateString(this.calendar.year, this.calendar.month, today.getDate());
  }
}
