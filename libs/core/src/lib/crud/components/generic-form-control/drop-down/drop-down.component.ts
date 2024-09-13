import { Component, Input, inject, signal } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { DropdownData } from '../../../models/dropdown.model';

@Component({
  selector: 'lib-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  viewProviders: [
    {
        provide: ControlContainer,
        useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class DropDownComponent {

    @Input({required: true}) FormControlData!: any
    @Input({ required: true }) dependencyData!: DropdownData

    ngOnInit(): void {
      this.parentFormGroup.addControl(this.FormControlData.name, this.FormControlData.formControl)

    }

    parentContainer = inject(ControlContainer)

    get parentFormGroup() {
        return this.parentContainer.control as FormGroup
    }

}
