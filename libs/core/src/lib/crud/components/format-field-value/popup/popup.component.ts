import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  form!: FormGroup
  formProperties!: any[]
  dependencyData!: any

  constructor(public refa: DynamicDialogConfig, public ref: DynamicDialogRef, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    if (this.refa.data.edit) {
    this.form = this.refa.data.form2
    this.formProperties = this.refa.data.form
    this.form.patchValue(this.refa.data.data)
    this.dependencyData = this.refa.data.dependencyData
      return
    }
    this.form = this.refa.data.form2
    this.formProperties = this.refa.data.form
    this.dependencyData = this.refa.data.dependencyData
  }

  save() {
    if (this.form.invalid) {
       return
    }
    this.ref.close(this.form.value);
  }

  cancel() {
    this.ref.close();
  }

}
