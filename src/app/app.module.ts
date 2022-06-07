import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ErrorListComponent } from './error-list/error-list.component';
import { SingleErrorComponent } from './error-list/single-error/single-error.component';
import { ErrorFormComponent } from './error-list/error-form/error-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { ErrorsService } from './services/errors.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'errors', canActivate: [AuthGuardService], component: ErrorListComponent },
  { path: 'errors/new', canActivate: [AuthGuardService], component: ErrorFormComponent },
  { path: 'errors/view/:id', canActivate: [AuthGuardService], component: SingleErrorComponent },
  { path: '', redirectTo: 'errors', pathMatch: 'full' },
  { path: '**', redirectTo: 'errors'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ErrorListComponent,
    SingleErrorComponent,
    ErrorFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    ErrorsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
