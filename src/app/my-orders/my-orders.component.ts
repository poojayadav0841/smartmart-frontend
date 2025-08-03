import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  imports: [MatTableModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  displayedColumns = ['Name', 'Address', 'Contact No.', 'Amount', 'Status'];

  myOrderDetails: MyOrderDetails[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.productService.getMyOrders().subscribe(
      (res: MyOrderDetails[]) => {
        console.log(res);
        this.myOrderDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
