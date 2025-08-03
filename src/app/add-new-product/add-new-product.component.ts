import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Product } from '../_model/product.model';
import { FormsModule  } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { DragDirective } from '../drag.directive'; 
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-new-product',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule , FormsModule ,MatGridListModule, CommonModule , DragDirective],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {

  isnewProduct = true;

  constructor(private productService : ProductService , 
    private sanitizer : DomSanitizer,
    private activatedRoute : ActivatedRoute
  ) {  }
  
  product : Product= {
    productId : 0,
    productName : "",
    productDescription : "",
    productDiscountedPrice : 0,
    productActualPrice : 0,
    productImages : []
  }

  ngOnInit() :void{
      this.product = this.activatedRoute.snapshot.data['product'];
      console.log('Resolved product:', this.product);

      if(this.product && this.product.productId>0){
        this.isnewProduct = false;
      }
      console.log('isnewProduct after check:', this.isnewProduct);
  }

  addProduct(productForm : NgForm){

    const productFormData = this.prepareFormData(this.product);
     this.productService.addProduct(productFormData).subscribe(
      (response : Product)=>{
        alert('Product added successfully');
        productForm.reset();
        this.product.productImages = [];
      },
      (error : HttpErrorResponse)=>{
        console.log("Error while adding product", error);
      }
     );
  }

  prepareFormData(product : Product) : FormData {
    const formData = new FormData();
    formData.append('product',
      new Blob([JSON.stringify(product)], {type : 'application/json'})
    );

    for(var i =0 ; i<product.productImages.length; i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event : any){
    if(event.target.files){
      const fileImage = event.target.files[0];

      const fileHandle: FileHandle = {
        file: fileImage,
        url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileImage))
      }
      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i : number){
      this.product.productImages.splice(i, 1);
      
    }

    fileDropped(fileHandle : FileHandle){
       this.product.productImages.push(fileHandle);
    }
}
