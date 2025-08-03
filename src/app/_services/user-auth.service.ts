import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public setRoles(roles: []): void {
    if (this.isBrowser) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public getRoles(): any[] {
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem('roles') || '[]');
    }
    return [];
  }

  public setToken(jwtToken: string): void {
    if (this.isBrowser) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  public clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  public isLoggedIn(): boolean {
    return this.isBrowser && !!this.getToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles.length > 0 && roles[0].roleName === 'Admin';
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    return roles.length > 0 && roles[0].roleName === 'User';
  }
}
