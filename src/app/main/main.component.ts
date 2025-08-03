import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
// import { SmartmartComponent } from '../smartmart/smartmart.component';
import { PopualarProductComponent } from '../popualar-product/popualar-product.component';
import { DiscountFeatureComponent } from '../discount-feature/discount-feature.component';
import { AppdemoComponent } from '../appdemo/appdemo.component';
import { FeatureCardComponent } from '../feature-card/feature-card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    // SmartmartComponent,
    PopualarProductComponent,
    DiscountFeatureComponent,
    AppdemoComponent,
    FeatureCardComponent,
    RouterOutlet,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  @ViewChild('prevBtn', { static: false }) prevBtn!: ElementRef;
  @ViewChild('nextBtn', { static: false }) nextBtn!: ElementRef;

  private swiper!: Swiper;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        // Ensures elements are available
        this.swiper = new Swiper(this.swiperContainer.nativeElement, {
          modules: [Navigation],
          slidesPerView: 'auto',
          spaceBetween: 30,
          loop: true,
          navigation: {
            nextEl: this.nextBtn.nativeElement,
            prevEl: this.prevBtn.nativeElement,
          },
        });

        // Ensure navigation buttons work
        this.prevBtn.nativeElement.addEventListener('click', () => {
          this.swiper.slidePrev();
        });

        this.nextBtn.nativeElement.addEventListener('click', () => {
          this.swiper.slideNext();
        });
      }, 500); // Small delay to ensure the elements exist
    }
  }
}
