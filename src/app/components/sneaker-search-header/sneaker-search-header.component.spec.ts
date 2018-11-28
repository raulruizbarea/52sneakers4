import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerSearchHeaderComponent } from './sneaker-search-header.component';

describe('SneakerSearchHeaderComponent', () => {
  let component: SneakerSearchHeaderComponent;
  let fixture: ComponentFixture<SneakerSearchHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakerSearchHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
