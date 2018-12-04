import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.route.snapshot.paramMap.get('categories');
    });
    console.log(this.route.snapshot.paramMap.get('categories'));
    console.log(this.route.params);
    console.log(this.route.snapshot.params);

      /*
    this.route.queryParams.subscribe(params => {
      this.firstname = params["firstname"];
      this.lastname = params["lastname"];
    });
    */
  }

}
