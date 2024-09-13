import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { CoreAuthModule } from '../../projects/core/src/lib/auth';
import { CoreCommonModule } from '../../projects/core/src/lib/common';
import { CoreShellModule } from '../../projects/core/src/lib/shell';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { navMenuItems } from './nav-menu-items';
import { appEffects } from './states/app.effects';
import { appReducers } from './states/app.reducers';
import { MultiSelectModule } from 'primeng/multiselect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MultiSelectModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers, {}),
    EffectsModule.forRoot(appEffects),
    CoreCommonModule.forRoot({ rest: environment.rest }),
    CoreShellModule.forRoot({ branding: environment.branding, navMenuItems }),
    CoreAuthModule.forRoot({
      rest: environment.rest,
      branding: environment.branding,
      ...environment.auth
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    ToastModule,
    ButtonModule,
    MenuModule,
    DropdownModule,
    FormsModule,
    BadgeModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
