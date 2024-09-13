import { CanActivateFn } from '@angular/router';

export const authCanActivateChild: CanActivateFn = (route, state) => {
  return true;
};