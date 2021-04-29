import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LinkGenerationService } from './link-generation.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenSubject = new Subject();
  public userDetails:any;
  public isLoader = false; // Loader Access
  public isAuthLogin = new BehaviorSubject({ isAuth: localStorage.getItem('userData') ? true : false });
  constructor(
    public linkGen: LinkGenerationService,
    private _http: HttpClient,
  ) {
  }

getUserDetails() {
  return new Promise((resolve, reject) => {
      return resolve(JSON.parse(localStorage.getItem('userData')))
  })
  
}
  /**
   * 
   * @param body Register data
   * @returns Register User
   */
  register(body) {
    const url = this.linkGen.webLinkGeneration(
      environment.authService.protocol,
      environment.authService.domainUrl,
      environment.authService.prefix,
      environment.authService.register);
    return this._http.post(url, body)
      .pipe(map(response => response));
  }

  /**
   * 
   * @param body login details
   * @returns Login User with Authenticate Token
   */
  login(body) {
    const url = this.linkGen.webLinkGeneration(
      environment.authService.protocol,
      environment.authService.domainUrl,
      environment.authService.prefix,
      environment.authService.login);
    return this._http.post(url, body)
      .pipe(map(response => response));
  }

  uploadPicture(body) {
    const url = this.linkGen.webLinkGeneration(
      environment.authService.protocol,
      environment.authService.domainUrl,
      environment.authService.prefix,
      environment.authService.uploadImage);
    return this._http.post(url, body)
      .pipe(map(response => response));
  }

  googleOauth() {
    const url = this.linkGen.webLinkGeneration(
      environment.authService.protocol,
      environment.authService.domainUrl,
      environment.authService.prefix,
      environment.authService.oAuthGoogle);
    return url;
  }

  getUserDetailsByToken(token) {
    const url = this.linkGen.webLinkGeneration(
      environment.authService.protocol,
      environment.authService.domainUrl,
      environment.authService.prefix,
      environment.authService.getUserByToken);
    return this._http.post(url, token)
      .pipe(map(response => response));
  }

  getTokenForInterceptors() {
    return JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).data.token : null;
  }

}
