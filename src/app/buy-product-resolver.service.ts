import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductService } from './_services/product.service';
import { map, Observable } from 'rxjs';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root',
})
export class BuyProductResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    const id: number = Number(route.paramMap.get('id'));
    const isSingleProductCheckout: boolean =
      route.paramMap.get('isSingleProductCheckout') === 'true';

    return this.productService
      .getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map((products: Product[]) =>
          products.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      );
  }
}
