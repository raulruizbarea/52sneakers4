import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'sneaker-search-header',
  templateUrl: './sneaker-search-header.component.html',
  styleUrls: ['./sneaker-search-header.component.scss']
})
export class SneakerSearchHeaderComponent implements OnInit {
  search: string;
  cancel: string;

  constructor(private modalCtrl: ModalController) {
    this.search = Constants.Search;
    this.cancel = Constants.Cancel;
  }

  ngOnInit() {
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }

}
