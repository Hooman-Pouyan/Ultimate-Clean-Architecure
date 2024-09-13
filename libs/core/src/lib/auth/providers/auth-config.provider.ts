import { InjectionToken } from '@angular/core';
import { CoreAuthConfig } from '../models/auth-config.model';

export const CORE_AUTH_CONFIG = new InjectionToken<CoreAuthConfig>('core.auth.config');

export const authConfigProvider = (config: CoreAuthConfig) => ({
  provide: CORE_AUTH_CONFIG,
  useValue: config
});

