import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/constants/app.constants';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { SneakerService } from 'src/app/services/sneaker.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  modalTitle: string;
  searchByName: string;
  allSneakers: Sneaker[];
  searched: Sneaker[];

  constructor(private modalCtrl: ModalController, private sneakerService: SneakerService) {
    this.modalTitle = Constants.Search;
    this.searchByName = Constants.SearchByName;
   }

  ngOnInit() {
    console.log('ngOnInit SearchPage');
    this.sneakerService.findAllSneakersNameDesc().pipe(
      tap(console.log))
      .subscribe(sneakers => {
         this.allSneakers = this.searched = sneakers;
         this.searched.concat(this.searched).concat(this.searched);
      });
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }

  search(search: string) {
    this.searched = this.allSneakers.filter(sneaker => sneaker.name.includes(search) );
  }
}
