import { CoreCommonConfig } from '../../common';
import { CoreShellConfig } from '../../shell';

export interface CoreAuthConfig
  extends Pick<CoreCommonConfig, 'rest'>,
    Pick<CoreShellConfig, 'branding'> {
  rememberMeExpiry: number;
}