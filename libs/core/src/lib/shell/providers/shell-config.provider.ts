import { InjectionToken } from '@angular/core';
import { CoreShellConfig } from '../models/shell-config.model';

export const CORE_SHELL_CONFIG = new InjectionToken<CoreShellConfig>('core.shell.config');
