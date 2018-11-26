import { Component, OnInit, Input } from '@angular/core';
import { Sneaker } from 'src/app/shared/model/sneaker';

@Component({
  selector: 'sneaker-cards-list',
  templateUrl: './sneaker-cards-list.component.html',
  styleUrls: ['./sneaker-cards-list.component.scss']
})
export class SneakerCardsListComponent implements OnInit {
  @Input() sneakers: Sneaker[];

  constructor() { }

  ngOnInit() {
    // console.log(this.sneakers);
  }

}
