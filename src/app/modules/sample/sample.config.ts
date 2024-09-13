import {
  buildActionPermissions,
  buildPagePaths,
  CrudConfig
} from '../../../../projects/core/src/lib/crud';
import { Sample } from './models/sample.model';

const base = 'sample';
const full = ['/', base];

export const sampleConfig = Object.freeze({
  info: {
    title: 'Sample',
    icon: 'pi pi-list'
  },
  field: {
    id: 'id',
    code: 'id',
    title: 'uom'
  },
  path: {
    base,
    full,
    page: buildPagePaths(full)
  },
  permission: {
    action: buildActionPermissions(full)
  },
  rest: {
        endpoint: `erp/base/masterdetail`
  }
}) as any