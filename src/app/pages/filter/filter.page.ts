import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  modalTitle: string;
  filter: string;

  constructor(private modalCtrl: ModalController) {
    this.modalTitle = Constants.Filter;
    this.filter = Constants.ApplyFilter;
  }

  ngOnInit() {
    console.log('ngOnInit FilterPage');
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }
}
