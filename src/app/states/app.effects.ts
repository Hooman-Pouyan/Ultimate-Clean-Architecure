import { AuthEffects } from '../../../projects/core/src/lib/auth/states';
import { SampleEffects } from '../modules/sample/states/sample.effects';

export const appEffects = [
  AuthEffects,
  SampleEffects
];
