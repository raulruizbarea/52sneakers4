import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  modalTitle: string;

  constructor(private modalCtrl: ModalController) {
    this.modalTitle = Constants.Search;
   }

  ngOnInit() {
    console.log('ngOnInit SearchPage');
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }
}
