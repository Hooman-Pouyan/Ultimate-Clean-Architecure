import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StateMessageService } from '../../state';
import { authSelectors, AuthStates } from '../states';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEventHandlerService {
  private stateMessageService = inject(StateMessageService);
  private authTokenService = inject(AuthTokenService);
  private authStore$ = inject(Store<AuthStates>);

  constructor() {
    const callback = (event: Event) => {
      this.authTokenService.extendTokenExpiry();
    };
    window.removeEventListener('beforeunload', callback);
    window.addEventListener('beforeunload', callback);
  }

  private registerStateHandlers() {
    this.authStore$
      .pipe(select(authSelectors.signIn.state))
      .subscribe(s => this.stateMessageService.failureObserver(s));

    this.authStore$
      .pipe(select(authSelectors.signUp.state))
      .subscribe(s => this.stateMessageService.failureSuccessObserver(s));

    this.authStore$
      .pipe(select(authSelectors.signOut.state))
      .subscribe(s => this.stateMessageService.failureObserver(s));
  }

  register() {
    this.registerStateHandlers();
    this.authTokenService.extendTokenExpiry();
  }
}
