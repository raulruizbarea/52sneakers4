import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'sneaker-header',
  templateUrl: './sneaker-header.component.html',
  styleUrls: ['./sneaker-header.component.scss'],
})
export class SneakerHeaderComponent implements OnInit {
  appName: string;

  constructor() {
    this.appName = Constants.AppName;
  }

  ngOnInit() {
  }

}
