import { AfterContentInit, Component, ContentChild, ElementRef, Input, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss'],
  viewProviders: [
    {
        provide: ControlContainer,
        useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class TypeListComponent {

  @Input({ required: true }) FormControlData!: any

    ngOnInit(): void {
      this.parentFormGroup.addControl(this.FormControlData.name, this.FormControlData.formControl)
    }

    parentContainer = inject(ControlContainer)

    get parentFormGroup() {
        return this.parentContainer.control as FormGroup
    }
}
