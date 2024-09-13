import { Directive, inject } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Directive()
export class ComponentFormBuilder {
  formBuilder = inject(FormBuilder)
  formProperties: any[] = []
  form!: FormGroup<any>

  public buildForm(formProperties: any[]) {
    const formControls: any = {};
    formProperties.forEach(property => {
      formControls[property.name] = new FormControl({value: property.defaultValue, disabled: property.disabled} ?? null, property.required ? Validators.required : undefined);
    });
    this.form = this.formBuilder.group(formControls)
    this.form.removeControl("undefined")

    this.generateFormProperties(formProperties)
    return {
      formGroup: this.form,
      formProperties: this.formProperties,
    }
  }

  generateFormProperties(formProperties: any) {
        formProperties.map((prop: any) => {
        if (prop.isShown)
        this.formProperties.push(
            {
            ...prop,
            formControl: this.form.controls[prop.name],
            formGroup: this.form,
          }
        )
      })
  }
}
