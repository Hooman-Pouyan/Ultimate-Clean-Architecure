import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { formatErrorMessage, OperationStatus } from '../../common';
import { AuthRestService } from '../services/auth-rest.service';
import { AuthActions } from './auth.actions';


@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authRestService = inject(AuthRestService);

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ request }) =>
        this.authRestService
          .signIn(request)
          .pipe(
            map(response =>
              AuthActions.signInSuccess({
                response,
                message: 'You signed in successfully',
                status: OperationStatus.Success
              })),
            catchError(({ error }) => of(AuthActions.signInFailure({
              message: formatErrorMessage(error),
              status: OperationStatus.Failure
            })))
          )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({ request }) =>
        this.authRestService
          .signUp(request)
          .pipe(
            map(response =>
              AuthActions.signUpSuccess({
                response,
                message: 'You signed up successfully',
                status: OperationStatus.Success
              })),
            catchError(({ error }) => of(AuthActions.signUpFailure({
              message: formatErrorMessage(error),
              status: OperationStatus.Failure
            })))
          )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      mergeMap(() =>
        this.authRestService
          .signOut()
          .pipe(
            map(() =>
              AuthActions.signOutSuccess({
                message: 'You signed out successfully',
                status: OperationStatus.Success
              })),
            catchError(({ error }) => of(AuthActions.signOutFailure({
              message: formatErrorMessage(error),
              status: OperationStatus.Failure
            })))
          )
      )
    )
  );
}
