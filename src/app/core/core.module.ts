import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LinkGenerationService } from './services/link-generation.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interseptor';

TokenInterceptor
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService, 
    LinkGenerationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
