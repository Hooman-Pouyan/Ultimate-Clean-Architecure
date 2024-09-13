import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  KeyValueDiffer,
  OnInit,
  Output
} from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { PaginationBuilder } from '../../builders/pagination.builder';
import { CorePaginator } from '../../models/pagination.model';
import { GenericToolbarComponent } from '../generic-toolbar/generic-toolbar.component';

@Component({
  selector: 'core-generic-list-toolbar',
  templateUrl: './generic-list-toolbar.component.html',
  styleUrls: ['./generic-list-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericListToolbarComponent extends GenericToolbarComponent
  implements OnInit, DoCheck {

  paginatorLabel?: string;
  infoDiffer!: KeyValueDiffer<any, any>;
  paginatorDiffer!: KeyValueDiffer<any, any>;

  @Input() selectedRecords = 0;
  @Input() showPaginator = true;
  @Input() rowsPerPageOptions = PaginationBuilder.rowsPerPageOptions();
  @Input() paginator: CorePaginator = PaginationBuilder.paginator();

  @Output() paginate = new EventEmitter<CorePaginator>();

  override ngOnInit() {
    super.ngOnInit();
    this.infoDiffer = this.keyValueDiffers.find(this.getInfoObject()).create();
    this.paginatorDiffer = this.keyValueDiffers.find(this.paginator).create();

  }

  override ngDoCheck() {
    super.ngDoCheck();
    const infoChanges = this.infoDiffer.diff(this.getInfoObject());
    const paginatorChanges = this.paginatorDiffer.diff(this.paginator);

    if (infoChanges || paginatorChanges) {
      this.buildPaginatorLabel();
    }
  }

  getInfoObject() {
    return {
      selectedRecords: this.selectedRecords,
      rowsPerPageOptions: this.rowsPerPageOptions,
      showPaginator: this.showPaginator,
    };
  }

  onPageChange(paginator: PaginatorState) {
    const { page, first, rows } = paginator;
    this.paginator.page = page || 0;
    this.paginator.first = first || 0;
    this.paginator.rows = (rows || this.paginator.rows);
    this.buildPaginatorLabel();
    this.paginate.emit({ ...this.paginator });
    this.changeDetectorRef.detectChanges();
  }

  buildPaginatorLabel() {


    const { total, page, first, pages, rows } = this.paginator;
    const last = (first + rows) > total ? total : (first + rows);
    let label = this.selectedRecords ? `${this.selectedRecords} Selected | ` : '';
    label += `Rows ${first + 1} - ${last} of ${total}`;
    label += ` | Page ${page + 1} of ${pages}`;

    this.paginatorLabel = label;
    this.changeDetectorRef.detectChanges();
  }
}
