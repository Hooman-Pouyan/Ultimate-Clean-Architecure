import { createReducer, on } from '@ngrx/store';
import { OperationStatus } from '../../common';
import { AuthCheckState, AuthSignInState, AuthSignOutState, AuthSignUpState } from '../models/auth-state.model';
import { AuthActions } from './auth.actions';

const { Pending, InProgress, Success, Failure } = OperationStatus;

const buildInitialState = <T>(type: string) => {
  return {
    type,
    request: {},
    response: {},
    message: '',
    status: Pending,
  } as T;
};


export const authReducers = {
  authSignIn: createReducer(
    buildInitialState<AuthSignInState>(AuthActions.signIn.type),
    on(
      AuthActions.signIn,
      (state, data) => ({ ...state, ...data, status: InProgress })
    ),
    on(
      AuthActions.signInSuccess,
      (state, data) => ({ ...state, ...data, status: Success })
    ),
    on(
      AuthActions.signInFailure,
      (state, data) => ({ ...state, ...data, status: Failure })
    ),
  ),
  authSignUp: createReducer(
    buildInitialState<AuthSignUpState>(AuthActions.signUp.type),
    on(
      AuthActions.signUp,
      (state, data) => ({ ...state, ...data, status: InProgress })
    ),
    on(
      AuthActions.signUpSuccess,
      (state, data) => ({ ...state, ...data, status: Success })
    ),
    on(
      AuthActions.signUpFailure,
      (state, data) => ({ ...state, ...data, status: Failure })
    ),
  ),
  authSignOut: createReducer(
    buildInitialState<AuthSignOutState>(AuthActions.signOut.type),
    on(
      AuthActions.signOut,
      (state) => ({ ...state, status: InProgress })
    ),
    on(
      AuthActions.signOutSuccess,
      (state) => ({ ...state, status: Success })
    ),
    on(
      AuthActions.signOutFailure,
      (state, data) => ({ ...state, ...data, status: Failure })
    ),
  ),
  authCheck: createReducer(
    buildInitialState<AuthCheckState>(AuthActions.check.type),
    on(
      AuthActions.check,
      (state) => ({ ...state, status: InProgress })
    ),
    on(
      AuthActions.checkSuccess,
      (state) => ({ ...state, status: Success })
    ),
    on(
      AuthActions.checkFailure,
      (state, data) => ({ ...state, ...data, status: Failure })
    ),
  ),
};