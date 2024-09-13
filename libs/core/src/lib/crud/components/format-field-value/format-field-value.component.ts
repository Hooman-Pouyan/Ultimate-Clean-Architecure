import { Component, Input } from '@angular/core';
import { DataType } from '../../../common';

@Component({
  selector: 'core-format-field-value',
  templateUrl: './format-field-value.component.html',
  styleUrls: ['./format-field-value.component.scss']
})
export class FormatFieldValueComponent {
  readonly DataType = DataType;

  @Input() index = 0;
  @Input() value: any;
  @Input() format?: string;
  @Input() type?: DataType;


}
