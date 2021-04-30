import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { URL_CONSTANTS } from 'src/app/shared/utils/constants/routes_constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean = false;
  token: any;
  oAuthRes: any;

  constructor(
    public route: Router,
    public _auth: AuthService,
    public activeRote: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginSchemaSetup();
    this.loginWithOAuth();
  }

  // Login Form Intialize
  loginSchemaSetup() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  /**
   * @param formData Login Form Data
   * @returns User Details
   */
  login(formData) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    this._auth.login(formData).subscribe(res => {
      localStorage.setItem('userData', JSON.stringify(res));
      this._auth.isAuthLogin.next({ isAuth: true });
      alert('Login SuccessFully, Redirecting to HomePage');
      this.route.navigate([URL_CONSTANTS.HOME_PAGE])
    }, err => {
      this._auth.isAuthLogin.next({ isAuth: false });
      alert(`Error in Login! ${err.message}`);
    })
  }

  loginWithOAuth() {
    this.activeRote.queryParams.subscribe(params => {
      if (!params.token) return;
      this.token = { token: params.token };
      this._auth.getUserDetailsByToken(this.token).subscribe(res => {
        this.oAuthRes = res;
        localStorage.setItem('userData', JSON.stringify(res));
        this._auth.isAuthLogin.next({ isAuth: true });
        // alert('Login SuccessFully, Redirecting to HomePage');
        setTimeout(() => {
          this.route.navigate([URL_CONSTANTS.HOME_PAGE]);
        }, 200);
      }, err => {
        this._auth.isAuthLogin.next({ isAuth: false });
        alert(`Error in Login! ${err.message}`);
      })
    })
  }

  googleLogin() {
    const oAuthLink = this._auth.googleOauth();
    window.open(oAuthLink, "_self");
  }
  // Gets the Controls for form
  get f() {
    return this.loginForm.controls;
  }


  goToSignup() {
    this.route.navigate(['/signup']);
  }

}
