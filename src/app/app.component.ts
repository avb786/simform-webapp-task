import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simform-webapp';
  constructor(
    public auth: AuthService
  ) { }
  ngOnInit() {
    if (localStorage.getItem('isAuth')) {
      this.auth.isAuthLogin.next({ isAuth: true });
    }

  }
}
