import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoreCommonConfig } from './models/config.model';
import { CORE_COMMON_CONFIG } from './providers/config.provider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class CoreCommonModule {
  static forRoot(config: CoreCommonConfig): ModuleWithProviders<CoreCommonModule> {
    return {
      ngModule: CoreCommonModule,
      providers: [
        { provide: CORE_COMMON_CONFIG, useValue: config }
      ]
    };
  }
}
