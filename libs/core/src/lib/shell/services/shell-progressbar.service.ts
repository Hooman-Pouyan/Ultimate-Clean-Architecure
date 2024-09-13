import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, interval, map, Subscription } from 'rxjs';
import { BasicListService } from '../../crud';

@Injectable({
  providedIn: 'root',
})
export class ShellProgressbarService {
  private router = inject(Router);

  readonly startValue = 0;
  readonly endValue = 100;
  readonly startInterval = 120;
  readonly endInterval = 1;
  readonly progressStep = 4;

  private _value = signal(this.startValue);
  readonly value = this._value.asReadonly();

  intervalSub?: Subscription;

  constructor() {
    this.router.events.pipe(
      filter(v => v instanceof NavigationStart),
      map(v => v as NavigationStart),
    ).subscribe(() => this.startProgress());

    this.router.events.pipe(
      filter(v => v instanceof NavigationEnd),
      map(v => v as NavigationEnd)
    ).subscribe(() => this.endProgress());
  }

  startProgress() {
    this.intervalSub?.unsubscribe();
    this._value.set(this.startValue);
    this.intervalSub = interval(this.startInterval).subscribe((a) => {
      this._value.update(v => {
        if (v >= (this.endValue - this.endValue / 3)) {
          this.intervalSub?.unsubscribe();
          return v;
        }

        return v + this.progressStep;
      });
    });
  }

  endProgress() {
    this.intervalSub?.unsubscribe();
    this.intervalSub = interval(this.endInterval).subscribe(() => {
      this._value.update(v => {
        if (v >= this.endValue) {
          this.intervalSub?.unsubscribe();
          return this.endValue;
        }

        return v + this.progressStep;
      });
    });
  }
}
