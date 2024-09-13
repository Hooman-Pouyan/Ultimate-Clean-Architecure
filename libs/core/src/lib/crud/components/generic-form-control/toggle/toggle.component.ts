import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
    viewProviders: [
    {
        provide: ControlContainer,
        useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class ToggleComponent {

    @Input({required: true}) FormControlData!: any

    ngOnInit(): void {
        this.parentFormGroup.addControl(this.FormControlData.name, this.FormControlData.formControl)
    }

    parentContainer = inject(ControlContainer)

    get parentFormGroup() {
        return this.parentContainer.control as FormGroup
    }

}
