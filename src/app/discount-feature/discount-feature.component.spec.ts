import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountFeatureComponent } from './discount-feature.component';

describe('DiscountFeatureComponent', () => {
  let component: DiscountFeatureComponent;
  let fixture: ComponentFixture<DiscountFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
