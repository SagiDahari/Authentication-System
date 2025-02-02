import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ResetPasswordSuccessComponent } from './pages/reset-password-success/reset-password-success.component';
import { ResetCodeComponent } from './pages/reset-code/reset-code.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset/:token', component: ResetComponent },
  { path: 'reset-code/:token', component: ResetCodeComponent },
  { path: 'password-reset-success', component: ResetPasswordSuccessComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
