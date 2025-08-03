import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../image-processing.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popualar-product',
  imports: [MatGridListModule , CommonModule],
  templateUrl: './popualar-product.component.html',
  styleUrl: './popualar-product.component.css'
})
export class PopualarProductComponent {

  constructor( private productService : ProductService,
    private imageProcessingService: ImageProcessingService,
    private router : Router
  ){}

  ngOnInit ():void{
    this.getAllProducts();
  }


  pageNumber : number = 0;

  productDetails : Product[] = [];

  showLoadButton : boolean = false;

  searchByKeyword(searchKeyword : string) {
    // console.log(searchKeyword);
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchKeyword );

  }

  public getAllProducts(searchKey: string = "") {
  this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: Product[]) =>
        x.map((product: Product) =>
          this.imageProcessingService.createImages(product)
        )
      )
    )
    .subscribe(
      (res: Product[]) => {
        console.log(res);
        if(res.length ==12){
          this.showLoadButton = true;
        }else{
          this.showLoadButton = false;
        }
        res.forEach(p =>this.productDetails.push(p));
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
}


  public loadMoreProduct(){
    this.pageNumber = this.pageNumber+1;
    this.getAllProducts();
  }

  showProductDetails(productId : any){
      this.router.navigate(['/productViewDetails' , {productId}]);
  }

  
}
