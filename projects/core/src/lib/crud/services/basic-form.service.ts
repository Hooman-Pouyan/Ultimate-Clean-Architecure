import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import { combineLatest, debounceTime, mergeAll, Subject, take, takeUntil } from 'rxjs';
import { OperationStatus, TypedForm } from '../../common';
import { ToolbarBuilder } from '../builders/toolbar.builder';
import { PageType } from '../enums/page.enum';
import { RouterStateKey } from '../enums/router-state.enum';
import { ToolAction } from '../enums/toolbar.enum';
import { CrudConfig } from '../models/crud.config';
import { CoreToolbar } from '../models/toolbar.model';
import { RestListParams } from '../models/rest.model';


@Injectable()
export class BasicFormService<T, TA, TU, F extends TypedForm<any>, S>  implements OnDestroy {
  protected router = inject(Router);
  protected store$ = inject(Store<S>);

  readonly onDestroy$ = new Subject<boolean>();
  readonly showLoading = {
    page: signal(false),
    save: signal(false),
    delete: signal(false)
  };

  form!: FormGroup<any>;
  details = signal<any>([])
  config!: CrudConfig<any>;
  actions!: any;
  selectors!: any;
  detailActions!: any;
  detailSelectors!: any;
  masterDetail: string | undefined = undefined;
  navigationState?: Record<string, any>;
  title?: string;
  submitted: boolean = false;
  embedded = false;
  pageType = PageType.View;

  private _id = signal('');
  set id(id: string) {
    this._id.set(id);
  }

  get id() {
    return this._id();
  }

  private _data = signal<T | null>(null);
  set data(data: T | null) {
    this._data.set(data);
  }

  get data() {
    return this._data();
  }

  beforePatchForm = (data: T) => {
  };

  init() {
    this.loadRouterStates();
    this.registerSaveSubscriber();
    this.registerDeleteSubscriber();

    const masterDetail: string = this.masterDetail!

    // console.log(
    //   {
    //     [masterDetail]: [
    //       {
    //         value: [masterDetail],
    //         matchMode: "equals",
    //         operator: "and"
    //       }
    //     ]
    //   })

    if (this.pageType !== PageType.Add) {
      if (this.pageType === PageType.View) {
        this.form.disable();
      }

      this.registerLoadDataHandler();
      this.loadData();
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  loadRouterStates() {
    this.navigationState = this.router.getCurrentNavigation()?.extras.state;
  }

  getToolbar(attachEventHandler = true) {
    let toolbar: CoreToolbar | undefined;

    if (this.pageType === PageType.Add) {
      toolbar = ToolbarBuilder.add<T>(this.config, {
        [ToolAction.Save]: { showLoading: this.showLoading.save.asReadonly() }
      });
    } else if (this.pageType === PageType.Edit) {
      toolbar = ToolbarBuilder.edit<T>(this.config, {
        [ToolAction.Save]: { showLoading: this.showLoading.save.asReadonly() },
        [ToolAction.Cancel]: { getId: this._id.asReadonly() },
      });
    } else if (this.pageType === PageType.View) {
      toolbar = ToolbarBuilder.view<T>(this.config, {
        [ToolAction.Edit]: { getId: this._id.asReadonly() },
        [ToolAction.Delete]: { showLoading: this.showLoading.delete.asReadonly() },
        [ToolAction.Refresh]: { showLoading: this.showLoading.page.asReadonly() },
      });
    }

    if (attachEventHandler) {
      toolbar?.events$?.pipe(
        takeUntil(this.onDestroy$),
      ).subscribe(({ action }) => {
        if (action === ToolAction.Save) {
          this.save();
        } else if (action === ToolAction.Refresh) {
          this.loadData();
        } else if (action === ToolAction.Delete) {
          this.delete();
        }
      });
    }

    return toolbar;
  }

  registerLoadDataHandler() {

    if (this.masterDetail) {
     this.store$.pipe(
      select(this.detailSelectors.list.state),
      debounceTime(0),
      takeUntil(this.onDestroy$)
     ).subscribe(({ status, response }) => {
      this.showLoading.page.set(status === OperationStatus.InProgress);
      this.details.set(response.results)
      this.form.patchValue({
        details: response.results
      });
    });
        }


    this.store$.pipe(
      select(this.selectors.get.state),
      debounceTime(0),
      takeUntil(this.onDestroy$)
    ).subscribe(({ status, response }) => {

      this.beforePatchForm(response);
      this.title = response[this.config.field.title];
      this.data = response;
      console.log(response)
      this.form.patchValue(response);
      console.log(this.form);
      const masterDetail: string = this.masterDetail!
      if (this.masterDetail) this.store$.dispatch(this.detailActions.list({
        query: {
          filter: {
                [masterDetail]: [
                    {
                      value: response[masterDetail],
                      matchMode: "equals",
                      operator: "and"
                    }
                  ]
            }
          }
      } as any))

      if (!this.embedded && status === OperationStatus.Success) {
        if (!this.navigationState || !this.navigationState[RouterStateKey.Title]) {
          this.updatePageState();
        }
      }
    });



  }

  registerSaveSubscriber() {
    this.store$.dispatch(this.actions.addReset());
    this.store$.dispatch(this.actions.updateReset());

    combineLatest([
      this.store$.pipe(select(this.selectors.add.state)),
      this.store$.pipe(select(this.selectors.update.state)),
    ]).pipe(
      mergeAll(1),
      takeUntil(this.onDestroy$)
    ).subscribe(({ status, response }) => {
      this.showLoading.save.set(status === OperationStatus.InProgress);
      this.showLoading.page.set(status === OperationStatus.InProgress);

      if (!this.embedded && status === OperationStatus.Success) {
        this.store$.dispatch(this.actions.getMutate({ request: response }));
        this.navigateToViewPage({ [RouterStateKey.Saved]: true });
      }
    });
  }

  registerDeleteSubscriber() {
    this.store$.dispatch(this.actions.deleteReset());

    this.store$.pipe(
      select(this.selectors.delete.status),
      takeUntil(this.onDestroy$)
    ).subscribe(status => {
      this.showLoading.delete.set(status === OperationStatus.InProgress);
      this.showLoading.page.set(status === OperationStatus.InProgress);

      if (!this.embedded && status === OperationStatus.Success) {
        this.navigateToListPage();
      }
    });
  }

  loadData() {
    if (this.pageType === PageType.Add) {
      return;
    }

    if (this.navigationState && this.navigationState[RouterStateKey.Saved]) {
      return;
    }

    this.store$.dispatch(this.actions.getReset());
    this.store$.dispatch(this.actions.get({ query: this.id }));
  }

  add() {
    const request = !this.masterDetail ?
      { ...this.form.value, [this.config.field.id]: undefined } as TA :
      {
        master: { ...this.form.value, [this.config.field.id]: undefined, details: undefined },
        details: this.form.get('details')?.value.map((detail: any) =>
        ({ ...detail, division_id: this.form.value.division_id }))
      }
    this.store$.dispatch(this.actions.add({ request }));
  }

  update() {
      const request = !this.masterDetail ?
      this.form.value as TU :
      {
        master: { ...this.form.value, details: undefined },
        details: this.form.get('details')?.value
      }
    this.store$.dispatch(this.actions.update({ query: this.id, request }));
  }

  delete() {
    this.store$.dispatch(this.actions.delete({ query: this.id }));
  }

  save() {
    this.submitted = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    if (this.pageType === PageType.Add) {
      this.add();
    } else if (this.pageType === PageType.Edit) {
      this.update();
    }
  }

  navigateToListPage() {
    this.router.navigate(this.config.path.page.list()).then();
  }

  navigateToViewPage(state?: any) {
    this.router.navigate(
      this.config.path.page.view(this.id),
      { state: { [RouterStateKey.Title]: this.title, ...(state && { ...state }) } }
    ).then();
  }

  updatePageState() {
    const currenPath = this.config.path.page[this.pageType](this.id);

    this.router.navigate(currenPath,
      { state: { [RouterStateKey.Title]: this.title }, skipLocationChange: false },
    ).then();
  }

  formControlHasError(controlName: string, error: string) {
    return this.submitted && this.form.get(controlName)?.hasError(error);
  }
}