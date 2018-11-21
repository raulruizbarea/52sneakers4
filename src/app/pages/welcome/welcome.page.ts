import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from '@ionic/angular';
import { Constants } from 'src/app/constants/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild(Slides) slidesParent: Slides;

  skip: string;
  readyTo: string;
  continue: string;

  slides = [
    {
      title: Constants.SliderOneTitle,
      description: Constants.SliderOneDescription,
      image: 'https://images.pexels.com/photos/450059/pexels-photo-450059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      title: Constants.SliderTwoTitle,
      description: Constants.SliderTwoDescription,
      image: 'https://images.pexels.com/photos/812875/pexels-photo-812875.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      title: Constants.SliderThreeTitle,
      description: Constants.SliderThreeDescription,
      image: 'https://images.pexels.com/photos/194913/pexels-photo-194913.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    }
  ];

  constructor(private router: Router) {
    this.skip = Constants.Skip;
    this.readyTo = Constants.ReadyTo;
    this.continue = Constants.Continue;
  }

  ngOnInit() {
    console.log('ngOnInit WelcomePage');
  }

  last() {
    this.slidesParent.slideTo(3, 500);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
