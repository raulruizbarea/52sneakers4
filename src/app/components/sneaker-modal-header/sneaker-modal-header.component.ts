import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'sneaker-modal-header',
  templateUrl: './sneaker-modal-header.component.html',
  styleUrls: ['./sneaker-modal-header.component.scss']
})
export class SneakerModalHeaderComponent implements OnInit {
  @Input() modalTitle: string;
  cancel: string;

  constructor(private modalCtrl: ModalController) {
    this.cancel = Constants.Cancel;
    this.modalTitle = Constants.AppName;
   }

  ngOnInit() {
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }

}
