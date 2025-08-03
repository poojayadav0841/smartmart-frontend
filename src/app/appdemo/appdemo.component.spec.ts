import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppdemoComponent } from './appdemo.component';

describe('AppdemoComponent', () => {
  let component: AppdemoComponent;
  let fixture: ComponentFixture<AppdemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppdemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
