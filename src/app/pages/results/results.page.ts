import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  categoriesFilter: string[];
  sizesFilter: number[];
  sportsFilter: string[];
  brandsFilter: string[];
  sliderValue: any;
  price: string;

  allSneakers: Sneaker[];
  filtered: Sneaker[];

  constructor(private filterService: FilterService, private sneakerService: SneakerService,
    private afAuth: AngularFireAuth) {
    this.price = Constants.Price;
    // console.log(this.filterService.storage.sizes);
    if (this.filterService.storage) {
      if (this.filterService.storage.categories) {
        this.categoriesFilter = this.filterService.storage.categories;
      }
      if (this.filterService.storage.sizes) {
        this.sizesFilter = this.filterService.storage.sizes;
      }
      if (this.filterService.storage.sports) {
        this.sportsFilter = this.filterService.storage.sports;
      }
      if (this.filterService.storage.brands) {
        this.brandsFilter = this.filterService.storage.brands;
      }
      if (this.filterService.storage.price) {
        this.sliderValue = this.filterService.storage.price;
      }
    }
  }

  ngOnInit() {

  }


  deleteCategory(category) {
    this.categoriesFilter.forEach((item, index) => {
      if (item === category) {
        this.categoriesFilter.splice(index, 1);
      }
    });
  }

  deleteSize(size) {
    this.sizesFilter.forEach((item, index) => {
      if (item === size) {
        this.sizesFilter.splice(index, 1);
      }
    });
  }

  deletePrice(price) {
    this.sliderValue = undefined;
  }

  deleteBrand(brand) {
    this.brandsFilter.forEach((item, index) => {
      if (item === brand) {
        this.brandsFilter.splice(index, 1);
      }
    });
  }

  deleteSport(sport) {
    this.sportsFilter.forEach((item, index) => {
      if (item === sport) {
        this.sportsFilter.splice(index, 1);
      }
    });
  }
}
