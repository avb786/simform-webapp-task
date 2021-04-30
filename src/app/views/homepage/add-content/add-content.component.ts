import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { APP_CONSTANTS } from 'src/app/shared/utils/constants/app_constants';
import { URL_CONSTANTS } from 'src/app/shared/utils/constants/routes_constants';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  public getParamsForContent: any;
  public addContentForm: FormGroup;
  public submitted = false;
  public imageUrl = "https://kfchits.in/images/signup-blue.png"
  public files: any;
  public imageUrlName: any;
  public imageObject: any;

  constructor(
    public router: Router,
    private _auth: AuthService,
    public _category: CategoryService,
    public activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
    this.intializeFormForContent();
  }

  intializeFormForContent(data?) {
    this.addContentForm = new FormGroup({
      content_img: new FormControl(data ? data.categoryName : ''),
      content_title: new FormControl(data ? data.type : '', [Validators.required]),
      content_description: new FormControl(data ? data.description : '', [Validators.required]),
      ratings: new FormControl(data ? data.description : '', [Validators.required]),
      content_lang: new FormControl(data ? data.description : 'en', [Validators.required]),
      content_level: new FormControl(data ? data.description : '0', [Validators.required]),
    })
  }

  get f() {
    return this.addContentForm.controls;
  }

  getQueryParams() {
    this.activateRoute.queryParams.subscribe(params => {
      if (params.categoryId && params.publisherId) {
        this.getParamsForContent = params;
      } else {
        this.router.navigate([URL_CONSTANTS.HOME_PAGE]);
      }
    })
  }

  async selectFile(event) {
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
        }
        this.imageUrl = obj.url;
        this.imageUrlName = obj.imageName;
      }
      await reader.readAsDataURL(this.files[i]);
    }
  }

  async addContet() {
    this.submitted = true;
    if (this.addContentForm.invalid) {
      return;
    }
    this._auth.isLoader = true;
    this.imageObject = await this.uploadImage();
    this.addContentForm.patchValue({
      content_img: this.imageObject.data.location
    });
    const finalBody = this.getFinalFormBody()
    this._category.addContent(finalBody).subscribe(res => {
      this._auth.isLoader = false;
      alert('Content Created Succefully ');
      this.router.navigate([URL_CONSTANTS.HOME_PAGE])
    }, err => {
      this._auth.isLoader = false;
    })
  }


  getFinalFormBody() {
    const formData = { ... this.addContentForm.value }
    const body = {
      content_description: formData.content_description,
      content_img: formData.content_img,
      content_title: formData.content_title,
      publisher_id: this.getParamsForContent.publisherId,
      category_id: Number(this.getParamsForContent.categoryId),
      ratings: Number(formData.ratings),
      content_lang: formData.content_lang,
      content_level: Number(formData.content_level)
    }
    return body;
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
    })

  }

}
