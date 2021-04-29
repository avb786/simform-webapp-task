import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddContentComponent } from './add-content/add-content.component';
import { CategoryComponent } from './category/category.component';
import { ContentComponent } from './content/content.component';
import { HomepageComponent } from './homepage.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '', component: HomepageComponent, children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      { path: 'category', component: CategoryComponent },
      { path: 'addCategory', component: AddCategoryComponent },
      { path: 'content', component: ContentComponent },
      { path: 'addContent', component: AddContentComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
