import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { URL_CONSTANTS } from 'src/app/shared/utils/constants/routes_constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedin: any;

  constructor(
    public auth: AuthService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.auth.isAuthLogin.subscribe(res => {
      this.isLoggedin = res.isAuth;
    })
  }

  logout() {
    localStorage.clear();
    this.route.navigate([URL_CONSTANTS.LOGIN]);
    this.auth.isAuthLogin.next({ isAuth: false })
    this.auth.userDetails = null;
  }
}
