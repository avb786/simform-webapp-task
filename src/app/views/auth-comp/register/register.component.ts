import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { APP_CONSTANTS } from 'src/app/shared/utils/constants/app_constants';
import { URL_CONSTANTS } from 'src/app/shared/utils/constants/routes_constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public submitted: Boolean = false;
  public imageUrl: any = 'https://cdn0.iconfinder.com/data/icons/web-seo-outline-1/32/user_interface_OUTLINE_GRADIENT-01-512.png'
  public files: any;
  public imageUrlName: any;
  imageObject: any;
  constructor(
    public route: Router,
    public _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.registerSchemaSetup();
  }

  // Intial Setup for form
  registerSchemaSetup() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      profile_image: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl(''),
      gender: new FormControl('male'),
      password: new FormControl('', [Validators.required])
    })
  }

  // Gets the Controls for form
  get f() {
    return this.registerForm.controls
  }

  goToLogin() {
    this.route.navigate([URL_CONSTANTS.LOGIN]);
  }

  /**
   * 
   * @param formValue Register FormValue
   * @returns 
   */
  async register(formValue) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.imageObject = await this.uploadImage();
    this.registerForm.patchValue({
      profile_image: this.imageObject.data.location
    })
    this._auth.register(this.registerForm.value).subscribe(res => {
      alert('Successfully Sign up, Redirecting to login page');
      this.route.navigate([URL_CONSTANTS.LOGIN]);
    }, err => {
      alert('Error in Sign up');
    })
  }

  // AWS Image upload
  uploadImage() {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('image', this.files[0])
      this._auth.uploadPicture(formData).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

  googleLogin() {
    const oAuthLink = this._auth.googleOauth();
    window.open(oAuthLink, "_self");
  }

  /**
   * 
   * @param event - File Event with image 
   */
  async selectFile(event) {
    console.log("===", event.target.files);
    this.files = event.target.files;
    this.imageUrl = '';
    for (let i = 0; i < this.files.length; i++) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        const obj = {
          url: event.target.result,
          imageName: this.files[i].name,
        }
        if (this.files[i].type == APP_CONSTANTS.IMAGE_PNG || this.files[i].type == APP_CONSTANTS.IMAGE_JPEG || this.files[i].type == APP_CONSTANTS.IMAGE_JPG) {
          obj[APP_CONSTANTS.TYPE] = 'image'
        } else {
          let type = this.files[i].name.split('.');
          obj[APP_CONSTANTS.TYPE] = type[type.length - 1]
          console.log("type", type);
        }
        this.imageUrl = obj.url;
        this.imageUrlName = obj.imageName;
      }
      await reader.readAsDataURL(this.files[i]);
    }
  }

}
