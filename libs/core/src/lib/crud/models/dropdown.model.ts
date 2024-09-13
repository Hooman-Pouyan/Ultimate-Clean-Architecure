import { Signal } from '@angular/core';
import { ValueLabel } from '../../common';

export interface DropdownData {
  options: Signal<ValueLabel[]>,
  icon: Signal<string>
}
