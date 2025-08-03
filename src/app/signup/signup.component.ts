import { Component , ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup,FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-signup',
  imports: [ CommonModule , ReactiveFormsModule, FormsModule , RouterLink, MatFormFieldModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent {

    
    
  constructor(private userService : UserService , private router: Router){
  
  }
    
  register(registerForm  : NgForm){
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
     (res)=>{
      console.log(res);
      this.router.navigate(['/login']);
     },
     (error)=>{
        console.log(error);
     }
    );
  }
  
}
