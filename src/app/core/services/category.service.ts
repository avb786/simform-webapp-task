import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LinkGenerationService } from './link-generation.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public updateCategory = new BehaviorSubject({ data: null });
  public userData: any;

  constructor(
    public _http: HttpClient,
    public linkGen: LinkGenerationService,
    public auth: AuthService
  ) {
    this.userData = this.getUserId()// to get userId
  }

  /**
   * 
   * @param userId Get Category By User id
   * @returns category details
   */

  getAllCategoryByUserId(userId) {
    let url = this.linkGen.webLinkGeneration(
      environment.categoryService.protocol,
      environment.categoryService.domainUrl,
      environment.categoryService.prefix,
      environment.categoryService.getCategoryByUserId);
    url = url.replace(':userId', userId);
    return this._http.get(url)
      .pipe(map(response => response));
  }

  /**
   * 
   * @param body Add Category Details
   * @returns 
   */
  addCategoryDetails(body) {
    const url = this.linkGen.webLinkGeneration(
      environment.categoryService.protocol,
      environment.categoryService.domainUrl,
      environment.categoryService.prefix,
      environment.categoryService.addCategory);
    return this._http.post(url, body)
      .pipe(map(response => response));
  }

  /**
   * 
   * @param body - Update body Category Details
   * @returns updated details
   */
  updateCategoryDetails(body) {
    const url = this.linkGen.webLinkGeneration(
      environment.categoryService.protocol,
      environment.categoryService.domainUrl,
      environment.categoryService.prefix,
      environment.categoryService.updateCategory);
    return this._http.post(url, body)
      .pipe(map(response => response));
  }

  /**
   * 
   * @param categoryId For Deletion of category Id
   * @returns 
   */
  deleteCategoryByUserId(categoryId, userId) {
    let url = this.linkGen.webLinkGeneration(
      environment.categoryService.protocol,
      environment.categoryService.domainUrl,
      environment.categoryService.prefix,
      environment.categoryService.deleteCategory);
    url = url.replace(':userId', userId);
    url = url.replace(':categoryId', categoryId);
    return this._http.delete(url)
      .pipe(map(response => response));
  }

  async getUserId() {
    return await this.auth.getUserDetails();
  }

  /**
   * 
   * @param categoryId 
   * @param userId 
   */
  getContentByCategoryAndUserId(categoryId, userId) {
    let url = this.linkGen.webLinkGeneration(
      environment.contentService.protocol,
      environment.contentService.domainUrl,
      environment.contentService.prefix,
      environment.contentService.getContent);
    url = url.replace(':userId', userId);
    url = url.replace(':categoryId', categoryId);
    return this._http.get(url)
      .pipe(map(response => response));
  }

  /**
   * 
   * @param contentBody 
   */
  addContent(contentBody) {
    let url = this.linkGen.webLinkGeneration(
      environment.contentService.protocol,
      environment.contentService.domainUrl,
      environment.contentService.prefix,
      environment.contentService.addContent);
    return this._http.post(url, contentBody)
      .pipe(map(response => response));
  }

  /**
   * 
   * @param searchItem 
   * @param userId
   * @returns 
   */
  searchContent(searchItem, userId) {
    let url = this.linkGen.webLinkGeneration(
      environment.contentService.protocol,
      environment.contentService.domainUrl,
      environment.contentService.prefix,
      environment.contentService.searchContent);
    url = url + searchItem + '&userId=' + userId;
    return this._http.get(url).pipe(map(response => response));
  }

  /**
   * 
   * @param filterData 
   */
  filterContent(filterData) {
    const url = this.linkGen.webLinkGeneration(
      environment.contentService.protocol,
      environment.contentService.domainUrl,
      environment.contentService.prefix,
      environment.contentService.filterContent);
    return this._http.post(url, filterData).pipe(map(response => response));
  }

  updateContent(updatedContent) {
    const url = this.linkGen.webLinkGeneration(
      environment.contentService.protocol,
      environment.contentService.domainUrl,
      environment.contentService.prefix,
      environment.contentService.updateContent);
    return this._http.put(url, updatedContent).pipe(map(response => response));

  }
}
