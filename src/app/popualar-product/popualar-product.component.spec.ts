import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopualarProductComponent } from './popualar-product.component';

describe('PopualarProductComponent', () => {
  let component: PopualarProductComponent;
  let fixture: ComponentFixture<PopualarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopualarProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopualarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
