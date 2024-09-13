import { ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
import { infoFieldsConfig } from '../../configs/info-fields.config';
import { InfoField } from '../../models/form.model';
import { GenericToolbarComponent } from '../generic-toolbar/generic-toolbar.component';

@Component({
  selector: 'core-generic-form-toolbar',
  templateUrl: './generic-form-toolbar.component.html',
  styleUrls: ['./generic-form-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericFormToolbarComponent extends GenericToolbarComponent
  implements OnInit, DoCheck {

  @Input() infoFields: InfoField[][] = infoFieldsConfig;
  @Input() data: any = {};
  @Input() showInfo = false;
}
