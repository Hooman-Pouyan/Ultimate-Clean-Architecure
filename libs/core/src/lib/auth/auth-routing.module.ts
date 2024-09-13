import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authDefaultConfig } from './auth-default.config';
import { authCanActivate } from './guards/auth-internal.guard';


const routes: Routes = [
  {
    path: authDefaultConfig.path.signIn,
    canActivate: [authCanActivate],
    loadComponent: () => import('./components/sign-in/auth-sign-in.component').then(m => m.AuthSignInComponent)
  },
  {
    path: authDefaultConfig.path.signUp,
    canActivate: [authCanActivate],
    loadComponent: () => import('./components/sign-up/auth-sign-up.component').then(m => m.AuthSignUpComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
