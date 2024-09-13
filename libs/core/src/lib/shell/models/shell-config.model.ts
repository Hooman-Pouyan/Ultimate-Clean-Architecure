import { MenuItem } from 'primeng/api';

export interface CoreShellConfigLogo {
  path: string;
  height: number;
  width: number;
}

export interface CoreShellConfigBrand {
  title: string;
  homePage: string;
  logo: {
    noTitle: CoreShellConfigLogo;
    hTitle: CoreShellConfigLogo;
    vTitle: CoreShellConfigLogo;
  };
}

export interface CoreShellConfigBranding {
  Clean-arch: CoreShellConfigBrand;
  organization: CoreShellConfigBrand;
}

export interface CoreShellConfig {
  branding: CoreShellConfigBranding;
  navMenuItems: MenuItem[];
}