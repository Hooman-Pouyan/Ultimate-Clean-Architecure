import { Injectable, OnDestroy, signal } from '@angular/core';
import { select, Selector, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { OperationStatus, ValueLabel } from '../../common';
import { DropdownData } from '../models/dropdown.model';


@Injectable({
  providedIn: 'any'
})
export class DropdownDataService implements OnDestroy {
  readonly onDestroy$ = new Subject<boolean>();

  load(store$: Store<any>, selector: any, dependencyData?: any): DropdownData {
    const options = signal<ValueLabel[]>([]);
    const icon = signal<string>('pi pi-angle-down');

    store$.pipe(
      select(selector),
      takeUntil(this.onDestroy$),
    ).subscribe(({ status, response }) => {
      icon.set(status === OperationStatus.InProgress ? 'pi pi-spin pi-spinner' : 'pi pi-angle-down');
      if (dependencyData) {
      var modifiedResponse = response.map((data: any) => {
        return {
          label: data.label,
          value: dependencyData.labelAsValue ? data.label : data.value
        }
      })
        options.set(modifiedResponse);
        return
      }
      options.set(response)
    });

    return {
      options: options.asReadonly(),
      icon: icon.asReadonly()
    };
  }

  loadWithApi() {
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
}
