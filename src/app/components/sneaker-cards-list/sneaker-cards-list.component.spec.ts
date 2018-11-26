import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerCardsListComponent } from './sneaker-cards-list.component';

describe('SneakerCardsListComponent', () => {
  let component: SneakerCardsListComponent;
  let fixture: ComponentFixture<SneakerCardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakerCardsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
