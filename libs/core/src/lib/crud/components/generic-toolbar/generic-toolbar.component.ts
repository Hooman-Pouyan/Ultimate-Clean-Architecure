import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  inject,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ToolElement } from '../../enums/toolbar.enum';
import { CoreToolbar, CoreToolbarItem, } from '../../models/toolbar.model';

@Component({
  selector: 'core-generic-toolbar',
  templateUrl: './generic-toolbar.component.html',
  styleUrls: ['./generic-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericToolbarComponent implements OnInit, DoCheck {
  readonly ToolElement = ToolElement;

  protected changeDetectorRef = inject(ChangeDetectorRef);
  protected keyValueDiffers = inject(KeyValueDiffers);
  protected confirmationService = inject(ConfirmationService);

  toolbarDiffers: KeyValueDiffer<any, any>[] = [];

  private _toolbar: CoreToolbar = { items: [] };
  @Input()
  set toolbar(toolbar: CoreToolbar) {
    for (const [i, item] of toolbar.items.entries()) {
      item.id = (Date.now() + i).toString();
    }

    this._toolbar = toolbar;
  }

  get toolbar() {
    return this._toolbar;
  }

  ngOnInit() {
    for (const item of this.toolbar.items) {
      this.toolbarDiffers.push(this.keyValueDiffers.find(item).create());
    }
  }

  ngDoCheck() {
    for (const [i, item] of this.toolbar.items.entries()) {
      const toolbarChanges = this.toolbarDiffers[i].diff(item);

      if (toolbarChanges) {
        this.changeDetectorRef.detectChanges();
      }
    }
  }

  runCommand(event: MouseEvent, item: CoreToolbarItem) {
    if (!item.confirm?.length) {
      item.command();
      return;
    }

    this.confirmationService.confirm({
      key: item.id,
      target: event.target as EventTarget,
      message: item.confirm,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-text p-button-danger',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      accept: () => item.command(),
    });
  }
}
