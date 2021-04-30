import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, Routes } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { URL_CONSTANTS } from 'src/app/shared/utils/constants/routes_constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categoryFound: any;
  public userDetails: any;
  public userId: any;
  constructor(
    public _auth: AuthService,
    private _category: CategoryService,
    public route: Router
  ) {
    this.userDetails = this._auth.userDetails;
  }
  public categoryDetails: any;

  async ngOnInit() {
    this.userId = await this._auth.getUserDetails();
    this.getAllCategoryByUserId(this.userId.data.user_id);
  }

  getAllCategoryByUserId(userId) {
    this._category.getAllCategoryByUserId(userId).subscribe((res: any) => {
      this.categoryDetails = res.data;
      this.categoryFound = true;
    }, err => {
      this.categoryFound = false;
    })
  }

  editCategory(data) {
    this._category.updateCategory.next({ data: data })
    this.route.navigate([URL_CONSTANTS.ADD_CATEGORY])
  }

  goToAddCategory() {
    this.route.navigate([URL_CONSTANTS.ADD_CATEGORY]);
  }

  async deleteCategory(categoryId) {
    this._auth.isLoader = true;
    const userDetails: any = await this._auth.getUserDetails();
    this._category.deleteCategoryByUserId(categoryId, userDetails.data.user_id).subscribe(res => {
      alert(`Category Id:${categoryId} deleted Successfully`);
      this.getAllCategoryByUserId(this.userId.data.user_id);
      this._auth.isLoader = false;
    }, err => {
      alert('Error in Deleting Category Id:' + categoryId);
      this._auth.isLoader = false;
    });
  }

  goToCategory(categoryId, userId) {
    let params: NavigationExtras = {
      queryParams: {
        categoryId: categoryId,
        userId: userId
      }
    }
    this.route.navigate([URL_CONSTANTS.CONTENT], params);
  }
}
