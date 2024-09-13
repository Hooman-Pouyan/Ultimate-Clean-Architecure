import { CommonModule } from '@angular/common';
import { inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { CoreAuthConfig } from './models/auth-config.model';
import { authConfigProvider } from './providers/auth-config.provider';
import { authInterceptorProvider } from './providers/auth-interceptor.provider';
import { AuthEventHandlerService } from './services/auth-event-handler.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
})
export class CoreAuthModule {
  private authEventHandlerService = inject(AuthEventHandlerService);

  constructor(@Optional() @SkipSelf() private parentModule?: CoreAuthModule) {
    if (parentModule) {
      throw new Error(
        'CoreAuthModule is already loaded. Import it in the AppModule only');
    }

    this.authEventHandlerService.register();
  }

  static forRoot(config: CoreAuthConfig): ModuleWithProviders<CoreAuthModule> {
    return {
      ngModule: CoreAuthModule,
      providers: [
        authConfigProvider(config),
        authInterceptorProvider()
      ]
    };
  }
}
