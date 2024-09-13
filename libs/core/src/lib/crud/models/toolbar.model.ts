import { Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolAction, ToolElement } from '../enums/toolbar.enum';

export interface CoreToolData {
  routerStates?: Signal<Record<string, any>>;
  queryParams?: Signal<Record<string, any>>;
  showLoading?: Signal<boolean>;
  getId?: Signal<string>;
}

export interface CoreToolbarItem {
  command: ($event?: any) => any;
  permission: string;
  element: ToolElement;
  id?: string;
  label?: string;
  tooltip?: string;
  icon?: string;
  styleClass?: string;
  confirm?: string;
  data?: CoreToolData;
}

export interface CoreToolbarEvent {
  action: ToolAction,
  payload?: any
}

export interface CoreToolbar {
  items: CoreToolbarItem[];
  events$?: Observable<CoreToolbarEvent>;
}