import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule ,FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router ,RouterLink } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule , RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent { 

  
  constructor(private userService : UserService ,private router : Router , private userAuthService: UserAuthService ){}

 login(loginForm:NgForm){
  this.userService.login(loginForm.value).subscribe(
    (response : any) => {
      console.log(response.jwtToken);
      console.log(response.user.roles);
      alert("Login Successful");
      // Navigate to the home page or any other page
      this.router.navigate(['/home']);

      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);
      

      const role = response.user.role[0].roleName;
      if(role ==='Admin'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/user']);
      }
    },
    (error) => {
      console.error(error);
      alert("Login Failed");
    }
  );
  
 }

 
}
