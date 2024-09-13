import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { CoreCrudModule } from '../../../../projects/core/src/lib/crud';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { SampleListComponent } from './components/sample-list/sample-list.component';

import { SampleRoutingModule } from './sample-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { sampleReducers } from './states/sample.reducers';
import { SampleEffects } from './states/sample.effects';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    SampleFormComponent,
    SampleListComponent
  ],
  imports: [
    CommonModule,
    SampleRoutingModule,
    CoreCrudModule,
    MultiSelectModule,
    CheckboxModule,
    InputTextModule,
    PaginatorModule,
    PasswordModule,
    ReactiveFormsModule,
    CalendarModule,
  ]
})
export class SampleModule {
}
