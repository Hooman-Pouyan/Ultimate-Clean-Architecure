import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DividerModule } from 'primeng/divider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderModule } from 'primeng/slider';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AuthPermissionDirective } from '../auth';
import {
  FormatFieldValueComponent
} from './components/format-field-value/format-field-value.component';
import {
  GenericFormToolbarComponent
} from './components/generic-form-toolbar/generic-form-toolbar.component';
import {
  GenericListToolbarComponent
} from './components/generic-list-toolbar/generic-list-toolbar.component';
import { GenericListComponent } from './components/generic-list/generic-list.component';
import { GenericToolbarComponent } from './components/generic-toolbar/generic-toolbar.component';
import { InfoFieldsComponent } from './components/info-fields/info-fields.component';
import { PagePathPipe } from './pipes/page-path.pipe';
import { ShowLoadingComponent } from './components/show-loading/show-loading.component';
import { DropdownOptionsPipe } from './pipes/dropdown-options.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TreeModule } from 'primeng/tree';
import { CoreFormComponent } from './components/generic-form/generic-form.component';
import { InputComponent } from './components/generic-form-control/input/input.component';
import { CalenderComponent } from './components/generic-form-control/calender/calender.component';
import { DivisionListComponent } from './components/generic-form-control/division-list/division-list.component';
import { NumberComponent } from './components/generic-form-control/number/number.component';
import { ToggleComponent } from './components/generic-form-control/toggle/toggle.component';
import {MessageModule} from "primeng/message"
import { InputSwitchModule } from "primeng/inputswitch"
import {ToggleButtonModule} from "primeng/togglebutton";
import { DropDownComponent } from './components/generic-form-control/drop-down/drop-down.component';
import { MultiSelectComponent } from './components/generic-form-control/multi-select/multi-select.component'
import { MultiSelectModule } from 'primeng/multiselect'
import { TypeListComponent } from './components/generic-form-control/types-list/type-list.component';
import { GenericDetailFormComponent } from './components/generic-detail-form/generic-detail-form.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { PopupComponent } from './components/format-field-value/popup/popup.component';

@NgModule({
  declarations: [
    GenericListComponent,
    GenericListToolbarComponent,
    GenericFormToolbarComponent,
    FormatFieldValueComponent,
    InfoFieldsComponent,
    PagePathPipe,
    GenericToolbarComponent,
    ShowLoadingComponent,
    DropdownOptionsPipe,
    CoreFormComponent,
    InputComponent,
    CalenderComponent,
    DivisionListComponent,
    NumberComponent,
    ToggleComponent,
    DropDownComponent,
    MultiSelectComponent,
    TypeListComponent,
    GenericDetailFormComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    DynamicDialogModule,
    ButtonModule,
    PaginatorModule,
    SharedModule,
    TableModule,
    TooltipModule,
    StyleClassModule,
    OverlayPanelModule,
    SliderModule,
    RippleModule,
    DividerModule,
    MultiSelectModule,
    ConfirmPopupModule,
    SpeedDialModule,
    AuthPermissionDirective,
    SkeletonModule,
    ReactiveFormsModule,
    MessageModule,
    InputSwitchModule,
    ToggleButtonModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    TreeModule
  ],
  exports: [
    GenericListComponent,
    GenericListToolbarComponent,
    GenericFormToolbarComponent,
    FormatFieldValueComponent,
    InfoFieldsComponent,
    PagePathPipe,
    ShowLoadingComponent,
    DropdownOptionsPipe,
    CoreFormComponent,
    DynamicDialogModule,
    InputComponent,
    CalenderComponent,
    DivisionListComponent,
    NumberComponent,
    ToggleComponent,
    DropDownComponent,
    MultiSelectComponent,
    TypeListComponent
  ]
})
export class CoreCrudModule {

}
