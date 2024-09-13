import { Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DataType } from '../../common';
import { ToolElement } from '../enums/toolbar.enum';
import { CoreToolbarEvent } from './toolbar.model';


export interface CoreTableActionData {
  routerStates?: string[][];
  queryParams?: Record<string, any>;
  showLoading?: Signal<boolean>;
}

export interface CoreTableColumn {
  field: string;
  label: string;
  id?: string;
  tooltip?: string;
  type?: DataType;
  format?: string;
  hidden?: boolean;
  styleClass?: string;
}

export interface CoreTableAction {
  command: ($event?: any) => any;
  permission: string;
  element: ToolElement;
  id?: string;
  label?: string;
  tooltip?: string;
  icon?: string;
  styleClass?: string;
  confirm?: string;
  data?: CoreTableActionData;
}

export interface CoreTable {
  columns: CoreTableColumn[];
  actions: CoreTableAction[];
  events$?: Observable<CoreToolbarEvent>;
}