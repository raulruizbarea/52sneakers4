import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { ModalController, NavController } from '@ionic/angular';
import { Categories, Sports, Brands } from 'src/app/shared/model/sneaker';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  modalTitle: string;
  filter: string;
  categories: string;
  man: string;
  woman: string;
  kid: string;
  sizes: string;
  sports: string;
  brands: string;
  categoriesForm: any;
  categoriesFilter: string[];
  sizesForm: any;
  sizesFilter: number[];
  sportsForm: any;
  sportsFilter: string[];
  brandsForm: any;
  brandsFilter: string[];
  price: string;
  sliderValue: any;

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) {
    this.modalTitle = Constants.Filter;
    this.filter = Constants.ApplyFilter;
    this.categories = Constants.Categories;
    this.man = Categories.Man;
    this.woman = Categories.Woman;
    this.kid = Categories.Kid;
    this.sizes = Constants.Sizes;
    this.sports = Constants.Sports;
    this.brands = Constants.Brands;
    this.price = Constants.Price;

    this.categoriesFilter = [];
    this.sizesFilter = [];
    this.sportsFilter = [];
    this.brandsFilter = [];

    this.sliderValue = {
      lower: 0,
      upper: 200,
    };

    this.categoriesForm = [
      { val: this.man, isChecked: false },
      { val: this.woman, isChecked: false },
      { val: this.kid, isChecked: false }
    ];

    this.sizesForm = [
      { val: 35, isChecked: false },
      { val: 36, isChecked: false },
      { val: 37, isChecked: false },
      { val: 38, isChecked: false },
      { val: 39, isChecked: false },
      { val: 40, isChecked: false },
      { val: 41, isChecked: false },
      { val: 42, isChecked: false },
      { val: 43, isChecked: false },
    ];

    this.brandsForm = [
      { val: Brands.Adidas, isChecked: false },
      { val: Brands.Converse, isChecked: false },
      { val: Brands.Nike, isChecked: false },
    ];

    this.sportsForm = [
      { val: Sports.Football, isChecked: false },
      { val: Sports.Basketball, isChecked: false },
      { val: Sports.Running, isChecked: false },
      { val: Sports.Training, isChecked: false },
    ];
  }

  ngOnInit() {
    console.log('ngOnInit FilterPage');
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }

  chkCategories(category) {
    // console.log(this.categoriesFilter);
    if (category.isChecked) {
      this.categoriesFilter.push(category.val);
    } else {
      this.categoriesFilter.forEach((item, index) => {
        if (item === category.val) {
          this.categoriesFilter.splice(index, 1);
        }
      });
    }
    // console.log(this.categoriesFilter);
  }

  chkSizes(size) {
    // console.log(this.sizesFilter);
    if (size.isChecked) {
      this.sizesFilter.push(size.val);
    } else {
      this.sizesFilter.forEach((item, index) => {
        if (item === size.val) {
          this.sizesFilter.splice(index, 1);
        }
      });
    }
    // console.log(this.sizesFilter);
  }

  chkBrands(brand) {
    // console.log(this.sizesFilter);
    if (brand.isChecked) {
      this.brandsFilter.push(brand.val);
    } else {
      this.brandsFilter.forEach((item, index) => {
        if (item === brand.val) {
          this.brandsFilter.splice(index, 1);
        }
      });
    }
    // console.log(this.sizesFilter);
  }

  chkSports(sport) {
    // console.log(this.sizesFilter);
    if (sport.isChecked) {
      this.sportsFilter.push(sport.val);
    } else {
      this.sportsFilter.forEach((item, index) => {
        if (item === sport.val) {
          this.sportsFilter.splice(index, 1);
        }
      });
    }
    // console.log(this.sizesFilter);
  }

  navigateToResults() {
    console.log(this.categoriesFilter);
    console.log(this.sizesFilter);
    console.log(this.sportsFilter);
    console.log(this.brandsFilter);
    console.log(this.sliderValue);

    const navigationExtras: NavigationExtras = {
      queryParams: {
          'categories': JSON.stringify(this.categoriesFilter),
          'sizes': JSON.stringify(this.sizesFilter),
          'sports': JSON.stringify(this.sportsFilter),
          'brands': JSON.stringify(this.brandsFilter),
          'price': JSON.stringify(this.sliderValue),
      }
    };

    console.log(navigationExtras);

    this.navCtrl.navigateForward('/main/tabs/(home:results)', true, navigationExtras);
    this.doCancel();
  }
}
