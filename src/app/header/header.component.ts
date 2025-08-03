import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    public userService: UserService
  ) {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  closeNavbar(): void {
    if (window.innerWidth < 992) {
      // Only collapse on small screens
      const bsCollapse =
        bootstrap.Collapse.getInstance(this.navbarCollapse.nativeElement) ||
        new bootstrap.Collapse(this.navbarCollapse.nativeElement, {
          toggle: false,
        });
      bsCollapse.hide();
    }
  }
}
