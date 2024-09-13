import { authReducers } from '../../../projects/core/src/lib/auth/states';
import { sampleReducers } from '../modules/sample/states/sample.reducers';

export const appReducers = {
  ...authReducers,
  ...sampleReducers
};
