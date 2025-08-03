import { Component, Injector, NgZone } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
// import { response } from 'express';
declare var Razorpay: any;

@Component({
  selector: 'app-buy-product',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css',
})
export class BuyProductComponent {
  isSingleProductCheckout: string = '';
  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantityList: [],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout =
      this.activatedRoute.snapshot.paramMap.get('isSingleProductCheckout') ??
      '';

    this.productDetails.forEach((x) =>
      this.orderDetails.orderProductQuantityList.push({
        productId: x.productId,
        quantity: 1,
      })
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.productService
      .placeOrder(this.orderDetails, this.isSingleProductCheckout)
      .subscribe(
        (resp) => {
          console.log(resp);
          // alert("Congratulation! Your order has been placed successfully");
          orderForm.reset();
          const ngZone = this.injector.get(NgZone);
          ngZone.run(() => {
            this.router.navigate(['/orderComfirm']);
          });
        },
        (err) => {
          console.log(err);
          alert('some error is encountered, please try again');
        }
      );
  }

  getQuantityForProduct(productId: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: number, productDiscountedPrice: any) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChange(qty: any, productId: number) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = qty;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach((productQuantity) => {
      const price = this.productDetails.filter(
        (product) => product.productId === productQuantity.productId
      )[0].productDiscountedPrice;
      grandTotal = grandTotal + price * productQuantity.quantity;
    });
    return grandTotal;
  }

  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getCalculatedGrandTotal();

    this.productService.createTransaction(amount).subscribe(
      (res) => {
        console.log(res);
        this.openTransactionModal(res, orderForm);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openTransactionModal(res: any, orderForm: NgForm) {
    var options = {
      order_id: res.orderId,
      key: res.key,
      amount: res.amount,
      currency: res.currency,
      name: 'Tester',
      description: 'Online Payment Shopping',
      image:
        'https://www.istockphoto.com/photo/fruits-and-vegetables-at-city-market-in-riga-gm453963935-25860295?utm_source=pixabay&utm_medium=affiliate&utm_campaign=sponsored_image&utm_content=srp_topbannerNone_media&utm_term=groceries',
      handler: (res: any) => {
        if (res != null && res.razorpay_payment_id != null)
          this.processResponse(res, orderForm);
        else {
          alert('Payment failed');
        }
      },
      prefill: {
        name: 'test',
        email: 'test@gmail.com',
        contact: '9174345234',
      },
      notes: {
        address: 'online shopping',
      },
      theme: {
        color: '#F37254',
      },
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }
  processResponse(response: any, orderForm: NgForm) {
    // console.log(response);
    this.orderDetails.transactionId = response.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
}
