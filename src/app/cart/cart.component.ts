import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [MatTableModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  displayedColumns: string[] = [
    'Name',
    'Description',
    'Price',
    'Discounted Price',
    'Action',
  ];

  cartDetails: any = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: number) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (res) => {
        console.log(res);
        this.getCartDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (res: any) => {
        console.log(res);
        this.cartDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkout() {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: false,
        id: 0,
      },
    ]);
  }
}
