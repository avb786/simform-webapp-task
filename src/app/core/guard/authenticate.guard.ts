import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor(
    public route: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      return new Promise((resolve,reject) => {
        console.log(localStorage);
        
        if (localStorage.length && localStorage.getItem('userData')) {
          return resolve(true);
        } else {
          this.route.navigate(['/login']);
          return resolve(false);
        }
      })


  }

}
