import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from '@ionic/angular';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @ViewChild('slides') slides: Slides;

  slideOpts = {
    effect: 'flip',
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  constructor() { }

  ngOnInit() {
  }

  nextSlide() {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

}
