import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'sneaker-footer',
  templateUrl: './sneaker-footer.component.html',
  styleUrls: ['./sneaker-footer.component.scss']
})
export class SneakerFooterComponent implements OnInit {
  footerTitle: string;

  constructor() {
    this.footerTitle = Constants.FooterTitle;
  }

  ngOnInit() {
  }

}
