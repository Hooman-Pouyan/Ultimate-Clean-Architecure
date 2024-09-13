import { PagePath, } from './page.model';
import { ActionPermission } from './permission.model';

export interface CrudConfig<B, I extends keyof B = any, C extends keyof B = any, T extends keyof B = any> {
  info: {
    title: string;
    icon: string;
  },
  field: {
    id: keyof Pick<B, I>;
    code: keyof Pick<B, C>;
    title: keyof Pick<B, T>;
  },
  path: {
    base: string;
    full: string[];
    page: PagePath;
  },
  permission: {
    action: ActionPermission;
  },
  rest: {
    endpoint: string;
  }
}
