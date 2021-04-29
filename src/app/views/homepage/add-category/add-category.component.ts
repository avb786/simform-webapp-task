import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { URL_CONSTANTS } from 'src/app/shared/utils/constants/routes_constants';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  public addCategoryForm: FormGroup;
  public submitted = false;
  public isUpdate = false;
  public updateCategorySubscribtion: Subscription;
  public categoryId: any;

  constructor(
    public route: Router,
    public _category: CategoryService,
    public _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.addCategorySchemaSetup()
    this._auth.isLoader = true;
    this.updateCategorySubscribtion = this._category.updateCategory.subscribe(res => {
      if (res.data) {
        this.categoryId = res.data.id;
        this.addCategorySchemaSetup(res.data);
        this.isUpdate = true;
      }
      this._auth.isLoader = false;
    }, err => {
      this._auth.isLoader = false;
    })
  }

  /**
   * 
   * @param data If update data occurs
   */
  addCategorySchemaSetup(data?) {
    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl(data ? data.categoryName : '', [Validators.required]),
      type: new FormControl(data ? data.type : '', [Validators.required]),
      description: new FormControl(data ? data.description : '', [Validators.required]),
    })
  }

  async updateCategory(data) {
    this.submitted = true;
    if (this.addCategoryForm.invalid) {
      return true
    }
    const userDetails: any = await this._auth.getUserDetails();
    const updateQuery = {
      query: data,
      userId: String(userDetails.data.user_id),
      categoryId: this.categoryId
    };
    this._auth.isLoader = true;
    this._category.updateCategoryDetails(updateQuery).subscribe(res => {
      alert('Category Updated Successfully');
      this._auth.isLoader = false;
      this.route.navigate([URL_CONSTANTS.HOME_PAGE]);
    })

  }

  /**
   * 
   * @param formValue Category Details
   * @returns 
   */
  async addCategory(formValue) {
    this.submitted = true;
    if (this.addCategoryForm.invalid) {
      return;
    }
    const categoryDetails = { ...formValue };
    const userDetails: any = await this._auth.getUserDetails();
    categoryDetails.userId = userDetails.data.user_id;
    this._auth.isLoader = true;
    this._category.addCategoryDetails(categoryDetails).subscribe(res => {
      alert('Category Added Successfull');
      this._auth.isLoader = false;
      this.route.navigate([URL_CONSTANTS.HOME_PAGE]);
    }, err => {
      alert('Error in Category Added');
      this._auth.isLoader = false;
    })

  }

  get f() {
    return this.addCategoryForm.controls;
  }

  ngOnDestroy() {
    this._category.updateCategory.next({ data: null });
    this.updateCategorySubscribtion.unsubscribe();
  }
}
