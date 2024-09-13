import { Component, Input, OnInit } from '@angular/core';
import { InfoField } from '../../models/form.model';


@Component({
  selector: 'core-info-fields',
  templateUrl: './info-fields.component.html',
  styleUrls: ['./info-fields.component.scss']
})
export class InfoFieldsComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.infoFields);
    console.log(this.data);
  }

  @Input() infoFields: InfoField[][] = [];
  @Input() data: any = {};


}
