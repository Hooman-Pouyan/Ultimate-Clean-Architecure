import { ActionSuccess, CommonState } from '../../state';
import { AuthSignIn, AuthSignInResponse, AuthSignUp, AuthSignUpResponse } from './auth.model';

export interface AuthSignInState extends CommonState {
  request: AuthSignIn;
  response: AuthSignInResponse;
}

export interface AuthSignUpState extends CommonState {
  request: AuthSignUp;
  response: AuthSignUpResponse;
}

export interface AuthSignOutState extends CommonState {
  request: any;
  response: any;
}

export interface AuthCheckState extends CommonState {
}

export interface ActionAuthSignIn {
  request: AuthSignIn;
}

export interface ActionAuthSignInSuccess extends ActionSuccess {
  response: AuthSignInResponse;
}

export interface ActionAuthSignUp {
  request: AuthSignUp;
}

export interface ActionAuthSignUpSuccess extends ActionSuccess {
  response: AuthSignUpResponse;
}