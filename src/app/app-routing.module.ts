import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authCanActivateChild } from '../../projects/core/src/lib/auth';

const routes: Routes = [{
  path: '', canActivateChild: [authCanActivateChild], children: [
    { path: '', redirectTo: 'sample/list', pathMatch: 'full' },
    {
      path: 'sample',
      loadChildren: () => import('./modules/sample/sample.module').then(m => m.SampleModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
