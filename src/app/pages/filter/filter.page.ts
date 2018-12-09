import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { ModalController, NavController } from '@ionic/angular';
import { Categories, Sports, Brands } from 'src/app/shared/model/sneaker';
import { FilterService } from 'src/app/services/filter.service';

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
  rating: string;
  ratingFilter: number;
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

  constructor(private modalCtrl: ModalController, private navCtrl: NavController,
    private filterService: FilterService) {
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
    this.rating = Constants.Rating;

    this.categoriesFilter = [];
    this.sizesFilter = [];
    this.sportsFilter = [];
    this.brandsFilter = [];
    this.ratingFilter = -1;

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

  ratingComponentClick(clickObj: any): void {
    // const item = this.sneakers.find(((i: any) => i.$key === clickObj.itemId));
    // if (!!item) {
      // this.ratingClicked = clickObj.rating;
      // calculate rating
      // item.sneaker.newRating = clickObj.rating;
    // }
    // console.log(clickObj.rating);
    this.ratingFilter = clickObj.rating;
  }

  navigateToResults() {
    this.filterService.storage = {
      'categories': this.categoriesFilter,
      'sizes': this.sizesFilter,
      'sports': this.sportsFilter,
      'brands': this.brandsFilter,
      'price': this.sliderValue,
      'rating': this.ratingFilter,
    };
    this.navCtrl.navigateForward('/main/tabs/(home:results)');
    this.doCancel();
  }
}
