import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerPage } from './sneaker.page';

describe('SneakerPage', () => {
  let component: SneakerPage;
  let fixture: ComponentFixture<SneakerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
