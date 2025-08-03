import { Component ,OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [CommonModule ,MatTableModule,MatIconModule,MatDialogModule],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit {

  showLoadMoreProductBtn: boolean = false;
  showTable: boolean = false;
  pageNumber: number = 0;
  productDetails : Product[]=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Disocunted Price','Actual Price','Images' , 'Edit' , 'Delete'];
  searchKeyword: string = "";

  constructor( private productService : ProductService,
    public imagesDialog : MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ){}

  ngOnInit() : void{
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword : string) {
    // console.log(searchKeyword);
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchKeyword );

  }

  public getAllProducts(searchKey: string = ""){
    this.showTable = false; //table will not be shown until data is present
    this.productService.getAllProducts(this.pageNumber,searchKey)
    .pipe(
      map( (x : Product[] , i) =>
        x.map((product : Product)=> this.imageProcessingService.createImages(product)))
      
    )
    .subscribe(
      (res : Product[])=>{
        console.log(res);
        // this.productDetails = res;
        res.forEach((product : Product) => {
          this.productDetails.push(product);
        }); //existing data will be present in the array
        this.showTable = true; //table will be shown only when data is present

        if(res.length == 12){
          this.showLoadMoreProductBtn = true; //show load more button only when data is present
        }else{
          this.showLoadMoreProductBtn = false; //hide load more button when no data is present
        }
      },(err : HttpErrorResponse) =>{
        console.log(err);
      } 
    )
  }

  LoadMoreProducts(){
    this.pageNumber++;
    this.getAllProducts();
  }


  deleteProduct(productId : number){
    this.productService.deleteProduct(productId).subscribe(
      (res)=>{
        this.getAllProducts();
      },
      (err : HttpErrorResponse) =>{
        console.log(err);
      }
    );
  }

  showImages(product : Product){
   console.log(product);
   this.imagesDialog.open(ShowProductImagesDialogComponent,{
    data: product.productImages,
    height: '500px',
    width :' 800px'
   });
  }

  editProductDetails(productId : any){
     this.router.navigate(['/addNewProduct', {productId : productId}]);
  }

  

}
