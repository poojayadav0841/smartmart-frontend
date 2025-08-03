import { Component , Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent} from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle.model';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-show-product-images-dialog',
  imports: [MatGridListModule , CommonModule , NgFor],
  templateUrl: './show-product-images-dialog.component.html',
  styleUrl: './show-product-images-dialog.component.css',
})
export class ShowProductImagesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FileHandle[]) {}

  ngOnInit(): void{
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
    console.log('isArray:', Array.isArray(this.data));
  }

}
