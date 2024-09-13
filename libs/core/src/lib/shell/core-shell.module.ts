import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ShellBreadcrumbComponent } from './components/shell-breadcrumb/shell-breadcrumb.component';
import { ShellNavComponent } from './components/shell-nav/shell-nav.component';
import { ShellToolbarComponent } from './components/shell-toolbar/shell-toolbar.component';
import { ShellTopbarComponent } from './components/shell-topbar/shell-topbar.component';
import { SellComponent } from './components/shell/shell.component';
import { CoreShellConfig } from './models/shell-config.model';
import { CORE_SHELL_CONFIG } from './providers/shell-config.provider';


@NgModule({
  declarations: [
    ShellBreadcrumbComponent,
    ShellTopbarComponent,
    ShellToolbarComponent,
    ShellNavComponent,
    SellComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    PanelMenuModule,
    ButtonModule,
    CardModule,
    ToolbarModule,
    SplitButtonModule,
    DividerModule,
    OverlayPanelModule,
    NgOptimizedImage,
    MenuModule,
    ProgressBarModule,
  ],
  exports: [
    SellComponent
  ]
})
export class CoreShellModule {
  static forRoot(config: CoreShellConfig): ModuleWithProviders<CoreShellModule> {
    return {
      ngModule: CoreShellModule,
      providers: [
        { provide: CORE_SHELL_CONFIG, useValue: config }
      ]
    };
  }
}
