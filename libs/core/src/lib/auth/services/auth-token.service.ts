import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, distinctUntilKeyChanged, filter, map } from 'rxjs';
import { CookieService, OperationStatus } from '../../common';
import { authDefaultConfig } from '../auth-default.config';
import { AuthToken } from '../models/auth.model';
import { CORE_AUTH_CONFIG } from '../providers/auth-config.provider';
import { AuthActions, authSelectors, AuthStates } from '../states';

/*
* The blocks that marked will be deleted
*  when the refresh token start working
* */

enum Field {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  RememberMe = 'remember_me' /* Will be deleted */
}

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private router = inject(Router);
  private authConfig = inject(CORE_AUTH_CONFIG);
  private authStore$ = inject(Store<AuthStates>);
  private cookieService = inject(CookieService);

  private lastUrlApplied = false;
  private readonly _token = signal<AuthToken>(this.fetchToken());
  private _userAuthenticated = computed(() => !!(
    this._token().access_token?.length && this._token().refresh_token?.length
  ));

  readonly defaultExpiry = 7 * 24 * 60;
  readonly storeLastUrlKey = 'auth.lastUrl';

  get userAuthenticated() {
    return this._userAuthenticated();
  }

  constructor() {
    this.registerEventHandlers();
  }

  hasUrlAuthPath(url: string) {
    const { path } = authDefaultConfig;
    const signInPath = '/' + path.signIn;
    const signUpPath = '/' + path.signUp;
    const forgotPath = '/' + path.forgotPassword;

    return [signInPath, signUpPath, forgotPath].includes(url);
  }

  private registerEventHandlers() {
    const { Success, Failure } = OperationStatus;
    this.lastUrlApplied = false;

    this.router.events.pipe(
      filter(v => v instanceof NavigationEnd),
      map(v => v as NavigationEnd)
    ).subscribe((route) => {
      if (!this.hasUrlAuthPath(route.url)) {
        this.storeLastUrl(route.url);
      }
    });

    this.authStore$.pipe(
      select(authSelectors.check.status),
      debounceTime(1),
      distinctUntilChanged(),
    ).subscribe((status) => {
      if (status === Success) {
      } else if (status === Failure) {
        if (!this.hasUrlAuthPath(location.pathname)) {
          this.redirectToApp(false, ['/', authDefaultConfig.path.signIn]);
        }
      }
    });

    this.authStore$.pipe(
      select(authSelectors.signIn.state),
      debounceTime(1),
      distinctUntilKeyChanged('status'),
    ).subscribe(({ status, request, response }) => {
      if (status === Success) {
        this.setToken({ ...response.token, remember_me: request.rememberMe });
        this.redirectToApp(true);
      } else if (status === Failure) {
        this.deleteToken();
      }

      this.checkToken();
    });

    this.authStore$.pipe(
      select(authSelectors.signUp.state),
      debounceTime(1),
      distinctUntilKeyChanged('status'),
    ).subscribe(({ status, response }) => {
      if (status === Success) {
        this.setToken(response.token);
        this.redirectToApp();
      } else if (status === Failure) {
        this.deleteToken();
      }

      this.checkToken();
    });

    this.authStore$.pipe(
      select(authSelectors.signOut.state),
      debounceTime(1),
      distinctUntilKeyChanged('status'),
      filter(s => s.status === Success)
    ).subscribe(() => {
      this.storeLastUrl('');
      this.deleteToken();
      this.checkToken();
    });

  }

  redirectToApp(toLastUrl = false, path = ['/']) {
    if (toLastUrl && !this.lastUrlApplied) {
      path.splice(0, path.length);
      path.push(this.restoreLastUrl());
    }

    this.router.navigate(path)
      .then(() => this.lastUrlApplied = toLastUrl)
      .catch(() => this.router.navigate(['/']).then());
  }

  fetchToken() {
    return {
      access_token: this.cookieService.getCookie(Field.AccessToken),
      refresh_token: this.cookieService.getCookie(Field.RefreshToken),
      remember_me: !!this.cookieService.getCookie(Field.RememberMe),
    } as AuthToken;
  }

  updateTokenSubject() {
    this._token.set(this.fetchToken());
  }

  setToken(token: AuthToken) {
    const { access_token, refresh_token, remember_me } = token;
    const exMinutes = remember_me ? (this.authConfig.rememberMeExpiry || this.defaultExpiry) : 0;

    this.cookieService.setCookie(Field.AccessToken, access_token, exMinutes /* Will be deleted */);
    this.cookieService.setCookie(Field.RefreshToken, refresh_token, exMinutes);

    if (remember_me) { /* Will be deleted */
      this.cookieService.setCookie(Field.RememberMe, remember_me, exMinutes);
    }

    this.updateTokenSubject();
  }

  getToken() {
    return this._token();
  }

  checkToken() {
    this.authStore$.dispatch(
      this.userAuthenticated ? AuthActions.checkSuccess() : AuthActions.checkFailure()
    );
  }

  deleteToken() {
    this.cookieService.deleteCookie(Field.AccessToken);
    this.cookieService.deleteCookie(Field.RefreshToken);
    this.cookieService.deleteCookie(Field.RememberMe); /* Will be deleted */
    this.updateTokenSubject();
  }

  setUserUnauthorized() {
    this.deleteToken();
    this.checkToken();
  }

  extendTokenExpiry() {
    if (!this.userAuthenticated) {
      return;
    }

    this.setToken(this.getToken());
  }

  storeLastUrl(url: string) {
    localStorage.setItem(this.storeLastUrlKey, url);
  }

  restoreLastUrl() {
    const url = localStorage.getItem(this.storeLastUrlKey);
    return url?.length ? url : '/';
  }
}
