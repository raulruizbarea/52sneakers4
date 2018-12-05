import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Constants } from 'src/app/constants/app.constants';
import { tap, map } from 'rxjs/operators';

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
  appliedFilters: string;

  allSneakers: Sneaker[];
  filtered: Sneaker[];

  constructor(private filterService: FilterService, private sneakerService: SneakerService,
    private afAuth: AngularFireAuth) {
    this.price = Constants.Price;
    this.appliedFilters = Constants.AppliedFilters;

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
    this.sneakerService.findAllSneakersWithLike(this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .pipe(
        map(sneakers => sneakers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))
      .subscribe(sneakers => {
         this.allSneakers = sneakers;
         this.filtered = this.allSneakers.slice();
         this.applyFilters();
      });
  }

  applyFilters() {
    this.filtered = this.allSneakers.slice();
    if (this.filtered) {
      let foundCategories = true;
      let foundSizes = true;
      let foundPrices = true;
      let foundBrands = true;
      let foundSports = true;

      this.filtered.slice(0).forEach((sneaker) => {
        if (this.categoriesFilter && this.categoriesFilter.length > 0) {
          foundCategories = Object.keys(sneaker.categories).some(r => {
            return this.categoriesFilter.includes(r);
          });
        }

        if (this.sliderValue && (this.sliderValue.lower !== 0 || this.sliderValue.upper !== 200)) {
          if (sneaker.price <= this.sliderValue.lower || sneaker.price >= this.sliderValue.upper) {
            foundPrices = false;
          }
        }

        if (this.sizesFilter && this.sizesFilter.length > 0) {
          foundSizes = Object.keys(sneaker.sizes).some(r => {
            return this.sizesFilter.includes(Number(r));
          });
        }

        if (this.brandsFilter  && this.brandsFilter.length > 0) {
          foundBrands = this.brandsFilter.includes(sneaker.brand);
        }

        if (this.sportsFilter && this.sportsFilter.length > 0) {
          foundSports = Object.keys(sneaker.sports).some(r => {
            return this.sportsFilter.includes(r);
          });
        }

        if (!foundCategories || !foundBrands || !foundPrices || !foundSizes || !foundSports) {
          this.filtered.splice(this.filtered.indexOf(sneaker), 1);
        }
      });

      if (this.categoriesFilter && this.categoriesFilter.length === 0
        &&  this.brandsFilter && this.brandsFilter.length === 0
        && this.sportsFilter && this.sportsFilter.length === 0
        && this.sliderValue && this.sliderValue.lower === 0 && this.sliderValue.upper === 200
        && this.sizesFilter && this.sizesFilter.length === 0) {
        this.filtered = this.allSneakers.slice();
      }
    }
  }

  deleteCategory(category) {
    this.categoriesFilter.forEach((item, index) => {
      if (item === category) {
        this.categoriesFilter.splice(index, 1);
      }
    });
    this.applyFilters();
  }

  deleteSize(size) {
    this.sizesFilter.forEach((item, index) => {
      if (item === size) {
        this.sizesFilter.splice(index, 1);
      }
    });
    this.applyFilters();
  }

  deletePrice(price) {
    this.sliderValue.lower = 0;
    this.sliderValue.upper = 200;
    this.applyFilters();
  }

  deleteBrand(brand) {
    this.brandsFilter.forEach((item, index) => {
      if (item === brand) {
        this.brandsFilter.splice(index, 1);
      }
    });
    this.applyFilters();
  }

  deleteSport(sport) {
    this.sportsFilter.forEach((item, index) => {
      if (item === sport) {
        this.sportsFilter.splice(index, 1);
      }
    });
    this.applyFilters();
  }
}
