import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ShellNavMode } from '../enums/shell.enum';

@Injectable({
  providedIn: 'root',
})
export class ShellNavService {
  private storeModeKey = 'shell.nav.mode';
  private readonly _mode = signal<ShellNavMode>(ShellNavMode.Wide);
  readonly mode = this._mode.asReadonly();

  constructor() {
    this.restoreMode();
    toObservable(this._mode).subscribe(mode => this.storeMode(mode));
  }

  setMode(mode: ShellNavMode) {
    this._mode.set(mode);
  }

  private storeMode(mode: ShellNavMode) {
    localStorage.setItem(this.storeModeKey, mode);
  }

  private restoreMode() {
    this._mode.set((localStorage.getItem(this.storeModeKey) as ShellNavMode) || ShellNavMode.Wide);
  }
}
