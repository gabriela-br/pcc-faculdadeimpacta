import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private route: ActivatedRoute) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login'], { relativeTo: this.route });
    return false;
  }
}