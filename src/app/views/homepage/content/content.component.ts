import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { URL_CONSTANTS } from 'src/app/shared/utils/constants/routes_constants';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public isContentFound = false;
  public contentDetails: any;
  public searchItem: any;
  public getParamsForContent: any;
  public showFilter = false;
  public ratingFilter: any = '';
  public contentLanguageFilter: any = '';
  public contentLevelFilter: any = '';
  public filterAppliedText: any;
  constructor(
    public router: Router,
    private _auth: AuthService,
    public _category: CategoryService,
    public activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      console.log('Params', params);
      this.getParamsForContent = params;
      if (params.categoryId && params.userId) {
        this.fetchContent(params.categoryId, params.userId);
        this.isContentFound = true;
      } else {
        this.isContentFound = false;
      }
    });
  }

  /**
   * Fetching the Content
   * @param categoryId 
   * @param userId 
   * @function fetchContent
   */
  fetchContent(categoryId, userId) {
    this._auth.isLoader = true;
    this._category.getContentByCategoryAndUserId(categoryId, userId).subscribe((res: any) => {
      this.contentDetails = res.data;
      this._auth.isLoader = false;
    }, err => {
      this.isContentFound = false;
      this._auth.isLoader = false;
    })
  }

  goToAddContent() {
    let params: NavigationExtras = {
      queryParams: {
        categoryId: this.getParamsForContent.categoryId,
        publisherId: this.getParamsForContent.userId
      }
    }
    this.router.navigate([URL_CONSTANTS.ADD_CONTENT], params);
  }

  showFilterToogle() {
    this.showFilter = !this.showFilter;
    if (!this.showFilter) {
      this.ratingFilter = '';
      this.contentLevelFilter = '';
      this.contentLanguageFilter = '';
      this.fetchContent(this.getParamsForContent.categoryId, this.getParamsForContent.userId);
      this.searchItem = '';
    }
  }

  cancelSearch() {
    if (!this.searchItem) {
      this.fetchContent(this.getParamsForContent.categoryId, this.getParamsForContent.userId);
    }
  }

  searchContent() {
    this._auth.isLoader = true;
    this._category.searchContent(this.searchItem, this.getParamsForContent.userId).subscribe((res: any) => {
      this.contentDetails = res.data;
      this._auth.isLoader = false;
    }, err => {
      this._auth.isLoader = false;
      alert('No Search result Found')
    })
  }

  // Filter Api Call
  applyFilter() {
    this._auth.isLoader = true;
    let filterData: any = {}
    if (this.ratingFilter) filterData['ratings'] = Number(this.ratingFilter);
    if (this.contentLanguageFilter) filterData.content_lang = this.contentLanguageFilter;
    if (this.contentLevelFilter) filterData.content_level = Number(this.contentLevelFilter);
    filterData.publisher_id = this.getParamsForContent.userId;
    filterData.category_id = this.getParamsForContent.categoryId;
    const filter = {
      filter: filterData
    }
    if (Object.keys(filterData).length === 0) {
      this._auth.isLoader = false;
      this.showFilter = false;
      return;
    }
    this._category.filterContent(filter).subscribe((res: any) => {
      this.showFilter = false;
      this.contentDetails = res.data;
      this.filterAppliedText = "Filter Applied Successfully!";
      this.hidePopUpFilter();
      this._auth.isLoader = false;
    }, err => {
      this.showFilter = false;
      this.filterAppliedText = "No Filter Data Found";
      this.hidePopUpFilter();
      this._auth.isLoader = false;
    })
  }

  hidePopUpFilter() {
    this.ratingFilter = '';
    this.contentLevelFilter = '';
    this.contentLanguageFilter = '';
    setTimeout(() => {
      this.filterAppliedText = 0;
    }, 2000);
  }

  addToFavorite(addToFavorite, contentId) {
    let updateFavorite = !addToFavorite;
    const updateContent = {
      add_to_favorite: updateFavorite
    }
    const updateQuery = {
      userId: this.getParamsForContent.userId,
      content_id: contentId,
      update_content: updateContent
    }
    this._auth.isLoader = true;
    this._category.updateContent(updateQuery).subscribe(res => {
      alert('Added to Favorite');
      this.fetchContent(this.getParamsForContent.categoryId, this.getParamsForContent.userId);
      this._auth.isLoader = false;
    }, err => {
      this._auth.isLoader = false;
    })

  }
}
