import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerFooterComponent } from './sneaker-footer.component';

describe('SneakerFooterComponent', () => {
  let component: SneakerFooterComponent;
  let fixture: ComponentFixture<SneakerFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakerFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
