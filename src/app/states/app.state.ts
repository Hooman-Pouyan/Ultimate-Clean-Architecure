import { AuthStates } from '../../../projects/core/src/lib/auth/states';
import { SampleStates } from '../modules/sample/states/sample.states';

export interface AppStates extends AuthStates, SampleStates {


}
