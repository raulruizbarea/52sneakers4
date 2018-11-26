import { Component, OnInit } from '@angular/core';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { SneakerService } from 'src/app/shared/model/sneaker.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allSneakers: Sneaker[];
  filtered: Sneaker[];

  constructor(private sneakerService: SneakerService) { }

  ngOnInit() {
      console.log('ngOnInit HomePage');
      this.sneakerService.findAllSneakers().pipe(
        tap(console.log))
        .subscribe(
            sneakers => this.allSneakers = this.filtered = sneakers
        );
  }

  search(search: string) {
    // this.filtered = this.allSneakers.filter(sneaker => sneaker.description.includes(search) );
  }
}
