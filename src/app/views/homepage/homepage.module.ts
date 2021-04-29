import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { CategoryComponent } from './category/category.component';
import { HomepageComponent } from './homepage.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from './content/content.component';
import { AddContentComponent } from './add-content/add-content.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [CategoryComponent, HomepageComponent, AddCategoryComponent, ContentComponent, AddContentComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomepageModule { }
