import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartmartComponent } from './smartmart.component';

describe('SmartmartComponent', () => {
  let component: SmartmartComponent;
  let fixture: ComponentFixture<SmartmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
