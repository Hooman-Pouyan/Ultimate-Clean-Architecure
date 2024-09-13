import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  signal
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { infoFieldsConfig } from '../../configs/info-fields.config';
import { ToolElement } from '../../enums/toolbar.enum';
import { CoreTable, CoreTableAction, CoreTableColumn } from '../../models/table.model';
import { BasicListService } from '../../services/basic-list.service';



@Component({
  selector: 'core-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, BasicListService]
})
export class GenericListComponent {
  private confirmationService = inject(ConfirmationService);
  private BasicListService = inject(BasicListService);

  readonly ToolElement = ToolElement;
  public altData = computed(() => !this.loading$() ? [] : [...Array(10).keys()]);

  @Input() idField = 'id';
  @Input() data: any[] = [];
  @Input() firstRow = 1;
  @Input() selectionMode?: 'single' | 'multiple' | null;
  loading$ = signal<boolean>(true)
  @Input() set loading(value: boolean) {
    this.BasicListService.progressBarLoading.next(false)
    console.log(value)
    this.loading$.set(value)
  };
  @Input() infoColumns: CoreTableColumn[][] = infoFieldsConfig;
  @Input() activatedRow: any = null;
  @Input() activationEnabled = false;
  FilteredColumns!: any
  private _table: CoreTable = { columns: [], actions: [] };
  @Input()
  set table(table: CoreTable) {
    for (const [i, action] of table.actions.entries()) {
      action.id = (Date.now() + i).toString();
    }

    this._table = table;
    console.log(table.columns)

  }

  get table() {
    return this._table;
  }

  @Output() selection = new EventEmitter<any[]>();
  @Output() activation = new EventEmitter<any>();

  runCommand(event: MouseEvent, key: string, id: string, action: CoreTableAction) {
    if (!action.confirm?.length) {
      action.command(id);
      return;
    }

    this.confirmationService.confirm({
      key,
      target: event.target as EventTarget,
      message: action.confirm,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-text p-button-danger',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      accept: () => action.command(id),
    });
  }

  buildRouterLink(id: string, action: CoreTableAction) {
    const routerLink = action.command(id);

    return Array.isArray(routerLink) || (typeof routerLink === typeof '') ? routerLink : [];
  }

  buildRouterLinkState(row: any, action: CoreTableAction) {
    const result = {} as Record<string, any>;

    if (!action.data?.routerStates?.length) {
      return result;
    }

    for (const [stateKey, rowKey] of action.data.routerStates) {
      result[stateKey] = row[rowKey];
    }

    return result;
  }

  selectionChanged(selectedRows: any[]) {
    this.selection.emit(selectedRows);
  }

  activated(row: any) {
    if (!this.activationEnabled) {
      return;
    }

    const activated = (this.activatedRow || {})[this.idField] !== (row || {})[this.idField]
      ? row
      : null;
    this.activatedRow = activated;
    this.activation.emit(activated);
  }
}
