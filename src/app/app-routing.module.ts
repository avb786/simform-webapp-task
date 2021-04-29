import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticateGuard } from './core/guard/authenticate.guard';
import { LoginComponent } from './views/auth-comp/login/login.component';
import { RegisterComponent } from './views/auth-comp/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'home', canActivate: [AuthenticateGuard], loadChildren: () => import('./views/homepage/homepage.module').then(m => m.HomepageModule) } // Lazy Loading for Home Module,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
