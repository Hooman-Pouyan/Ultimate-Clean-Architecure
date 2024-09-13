import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pagePathPattern, PageType } from 'projects/core/src/public-api';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { SampleListComponent } from './components/sample-list/sample-list.component';

const { List, View, Add, Edit } = PageType;
const { list, view, add, edit } = pagePathPattern;

const routes: Routes = [
  { path: '', redirectTo: list, pathMatch: 'full' },
  { path: list, component: SampleListComponent, data: { pageType: List } },
  { path: view, component: SampleFormComponent, data: { pageType: View } },
  { path: add, component: SampleFormComponent, data: { pageType: Add } },
  { path: edit, component: SampleFormComponent, data: { pageType: Edit } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule {
}
