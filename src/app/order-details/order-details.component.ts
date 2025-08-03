import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-order-details',
  imports: [MatTableModule, CommonModule, MatButtonToggleModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  displayedColumns = [
    'Id',
    'Product Name',
    'Name',
    'Address',
    'Status',
    'Contact No.',
    'Action',
  ];

  dataSource: MyOrderDetails[] = [];
  status: string = 'All';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusPara: string) {
    this.productService.getAllOrderDetailsForAdmin(statusPara).subscribe(
      (res) => {
        this.dataSource = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  markAsDelivered(orderId: number) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (res) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
