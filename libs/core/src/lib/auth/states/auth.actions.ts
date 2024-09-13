import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ActionFailure, ActionSuccess } from '../../state';
import {
  ActionAuthSignIn,
  ActionAuthSignInSuccess,
  ActionAuthSignUp,
  ActionAuthSignUpSuccess
} from '../models/auth-state.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'SignIn': props<ActionAuthSignIn>(),
    'SignIn Success': props<ActionAuthSignInSuccess>(),
    'SignIn Failure': props<ActionFailure>(),

    'SignUp': props<ActionAuthSignUp>(),
    'SignUp Success': props<ActionAuthSignUpSuccess>(),
    'SignUp Failure': props<ActionFailure>(),

    'SignOut': emptyProps(),
    'SignOut Success': props<ActionSuccess>(),
    'SignOut Failure': props<ActionFailure>(),

    'Check': emptyProps(),
    'Check Success': emptyProps(),
    'Check Failure': emptyProps(),
  }
});
