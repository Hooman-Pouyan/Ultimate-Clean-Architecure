import { effect, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, iif, of, Subject, switchMap, takeUntil } from 'rxjs';
import { OperationStatus } from '../../common';
import { PaginationBuilder } from '../builders/pagination.builder';
import { ToolbarBuilder } from '../builders/toolbar.builder';
import { ToolAction } from '../enums/toolbar.enum';
import { CrudConfig } from '../models/crud.config';
import { CorePaginator } from '../models/pagination.model';
import { CoreTable } from '../models/table.model';

@Injectable()
export class BasicListService<T, S> implements OnDestroy {
  protected store$ = inject(Store<S>);

  readonly onDestroy$ = new Subject<boolean>();
  readonly showLoading = signal(true);

  config!: CrudConfig<any>;
  actions!: any;
  selectors!: any;
  table!: CoreTable;
  data: T[] = [];
  selectedRecords: T[] = [];
  paginator: CorePaginator = PaginationBuilder.paginator();
  embedded = false;
  progressBarLoading = new BehaviorSubject<boolean>(true)


  init() {
    this.registerInternalSubscribers();
    this.registerLoadDataSubscriber();
    this.onPaginate(this.paginator);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  getToolbar(attachEventHandler = true) {
    const toolbar = ToolbarBuilder.list<T>(this.config, {
      [ToolAction.Refresh]: { showLoading: this.showLoading.asReadonly() }
    });

    if (attachEventHandler) {
      toolbar.events$?.pipe(
      switchMap(res => iif(() => !this.showLoading(), of(res), of())),
      takeUntil(this.onDestroy$)
    ).subscribe(({ action }) => {
      if (action === ToolAction.Refresh) {
        this.loadData();
      }
    });
    }

    return toolbar;
  }

  registerInternalSubscribers() {
    this.table.events$?.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(({ action, payload: id }) => {
      if (action === ToolAction.Delete) {
        this.delete(id);
      }
    });
  }

  registerLoadDataSubscriber() {
    this.store$.pipe(
      select(this.selectors.list.state),
      takeUntil(this.onDestroy$)
    ).subscribe(({ response, status }) => {
      this.showLoading.set(status === OperationStatus.InProgress);
      if (status === OperationStatus.Success) {
        this.data = response.results;
        this.paginator.pages = response.page_info.total_pages;
        this.paginator.total = response.page_info.total_results;
      }
    });
  }

  loadData() {
    this.store$.dispatch(this.actions.list({
      query: {
        page: this.paginator.page + 1,
        take: this.paginator.rows,
      }
    }));
  }

  delete(id: string) {
    this.store$.dispatch(this.actions.delete({ query: id }));
  }

  onPaginate(paginator: CorePaginator) {
    this.paginator = paginator;
    this.loadData();
  }

  selectionChanged(selectedItems: T | T[]) {
    this.selectedRecords = Array.isArray(selectedItems) ? selectedItems : [selectedItems];
  }

}
