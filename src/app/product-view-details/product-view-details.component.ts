import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  imports: [MatGridListModule, CommonModule],
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css',
})
export class ProductViewDetailsComponent implements OnInit {
  selectedProductIndex = 0;

  product: Product | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }

  addToCart(productId: any) {
    // console.log(productId);
    this.productService.addToCart(productId).subscribe(
      (res) => {
        console.log(res);
        alert('order is successfully added to the cart');
      },
      (err) => {
        alert('failed..  to add to the cart !..');
        console.log(err);
      }
    );
  }

  buyProduct(productId: any) {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: true,
        id: productId,
      },
    ]);
  }
}
