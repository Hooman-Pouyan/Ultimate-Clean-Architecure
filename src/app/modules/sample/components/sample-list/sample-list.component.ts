import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import {
  CorePaginator,
  PageType,
  PaginationBuilder,
  RouterStateKey,
  ToolAction
} from '../../../../../../projects/core/src/lib/crud';
import {
  CoreTable,
  CoreToolbar,
  DataType,
  OperationStatus,
  ToolbarBuilder
} from '../../../../../../projects/core/src/public-api';
import { AppStates } from '../../../../states/app.state';
import { Sample } from '../../models/sample.model';
import { sampleConfig } from '../../sample.config';
import { SampleActions } from '../../states/sample.actions';
import { sampleSelectors } from '../../states/sample.selectors';

@Component({
  selector: 'app-sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.scss']
})
export class SampleListComponent implements OnInit, OnDestroy {
  private appStore$ = inject(Store<AppStates>);

  readonly config = sampleConfig;
  readonly onDestroy$ = new Subject<boolean>();
  readonly showLoading = signal(true);
  readonly table: CoreTable = {
    columns: [
      { field: 'index', label: '#', tooltip: 'Index', type: DataType.Index },
      {
        field: 'active',
        label: 'A',
        tooltip: 'is Active',
        type: DataType.Boolean,
        format: 'icon',
        styleClass: 'boolean'
      },
      { field: 'code', label: 'Code' },
      { field: 'title', label: 'Title' },
      {
        field: 'date',
        label: 'Date',
        type: DataType.Datetime,
        format: 'longDate'
      },
      { field: 'divisionId', label: 'Division' },
    ],
    ...ToolbarBuilder.tableActions<Sample>(this.config, {
      [ToolAction.View]: {
        routerStates: [[RouterStateKey.Title, this.config.field.title]],
      }
    })
  };
  readonly toolbar: CoreToolbar = ToolbarBuilder.list<Sample>(this.config, {
    [ToolAction.Refresh]: {
      showLoading: this.showLoading.asReadonly()
    }
  });

  data: Sample[] = [];
  filteredData: Sample[] = [
    {
        id: "4",
  code: "string",
  active: true,
  title: "string",
  date: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    },
        {
        id: "1",
  code: "string",
  active: true,
  title: "string",
  date: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    },
            {
        id: "2",
  code: "string",
  active: true,
  title: "string",
  date: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    },
                {
        id: "3",
  code: "string",
  active: true,
  title: "string",
  date: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    }
  ];
  selectedRecords: Sample[] = [];
  paginator: CorePaginator = PaginationBuilder.paginator();

  @Input() pageType?: PageType;

  ngOnInit() {
    this.registerInternalSubscribers();
    this.registerLoadDataHandler();
    this.registerDeleteHandler();
    this.onPaginate(this.paginator);
    this.updateFilteredData();

  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  registerInternalSubscribers() {
    this.toolbar.events$?.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(({ action }) => {
      if (action === ToolAction.Refresh) {
        this.loadData();
      }
    });
    this.table.events$?.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(({ action, payload: id }) => {
      if (action === ToolAction.Delete) {
        this.delete(id);
      }
    });
  }

  registerLoadDataHandler() {
    this.appStore$.pipe(
      select(sampleSelectors.list.state),
      takeUntil(this.onDestroy$)
    ).subscribe(({ response, status, message }) => {
      this.showLoading.set(status === OperationStatus.InProgress);
      if (status === OperationStatus.Failure) {
        // this.utilityResponse.alertHandler(NotificationHandler.error(message));
      } else if (status === OperationStatus.Success) {
        this.data = response.results;
        this.updateFilteredData();
      }
    });
  }

  registerDeleteHandler() {
    this.appStore$.pipe(
      select(sampleSelectors.delete.state),
      takeUntil(this.onDestroy$)
    ).subscribe(({ response, status, message }) => {
      if (status === OperationStatus.Failure) {
        // this.utilityResponse.alertHandler(NotificationHandler.error(message));
      } else if (status === OperationStatus.Success) {
        this.loadData();
      }
    });
  }

  loadData() {
    this.appStore$.dispatch(SampleActions.list({}));
  }

  delete(id: string) {
    this.appStore$.dispatch(SampleActions.delete({ query: id }));
  }

  updateFilteredData() {
    const { first, rows } = this.paginator;
    this.filteredData = this.data.slice(first, first + rows);
    this.paginator.total = 2;
    this.paginator.pages = this.paginator.total / rows;
  }

  onPaginate(paginator: CorePaginator) {
    this.paginator = paginator;
    this.loadData();
  }

  selectionChanged(selectedItems: Sample | Sample[]) {
    this.selectedRecords = Array.isArray(selectedItems) ? selectedItems : [selectedItems];
  }

  activated(item: Sample) {
  }
}
