import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
    viewProviders: [
    {
        provide: ControlContainer,
        useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class MultiSelectComponent {

    @Input({required: true}) FormControlData!: any
    @Input({required: false}) dependencyData!: any

    ngOnInit(): void {
      this.parentFormGroup.addControl(this.FormControlData.name, this.FormControlData.formControl as FormControl)
    }

    parentContainer = inject(ControlContainer)

    get parentFormGroup() {
        return this.parentContainer.control as FormGroup
    }

}
