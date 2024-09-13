import { Component, Input, OnInit } from '@angular/core';
import { InfoField } from '../../models/form.model';


@Component({
  selector: 'core-info-fields',
  templateUrl: './info-fields.component.html',
  styleUrls: ['./info-fields.component.scss']
})
export class InfoFieldsComponent {

  @Input() infoFields: InfoField[][] = [];
  @Input() data: any = {};
}
