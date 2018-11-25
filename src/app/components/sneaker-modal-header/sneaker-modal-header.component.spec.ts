import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerModalHeaderComponent } from './sneaker-modal-header.component';

describe('SneakerModalHeaderComponent', () => {
  let component: SneakerModalHeaderComponent;
  let fixture: ComponentFixture<SneakerModalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakerModalHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
