import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerHeaderComponent } from './sneaker-header.component';

describe('SneakerHeaderComponent', () => {
  let component: SneakerHeaderComponent;
  let fixture: ComponentFixture<SneakerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
