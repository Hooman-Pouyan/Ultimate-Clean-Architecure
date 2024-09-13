import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, effect, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ComponentFormBuilder } from '../../builders/form-builder';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BehaviorSubject, debounceTime, filter, takeUntil } from 'rxjs';
import { FormDependencySubscriber } from '../../services/FormDependencySybscriber.service';
import { Store, select } from '@ngrx/store';
import { BasicFormService } from '../../services/basic-form.service';
import { PageType } from '../../enums/page.enum';
import { OperationStatus } from '../../../common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupComponent } from '../format-field-value/popup/popup.component';


@Component({
  selector: 'lib-generic-detail-form',
  templateUrl: './generic-detail-form.component.html',
  styleUrls: ['./generic-detail-form.component.scss'],
  providers: [
    MessageService,
    BasicFormService,
    DialogService, MessageService
  ],
  animations: [
    trigger('bounceInOut', [
      state('in', style({ transform: 'scale(1)' })),
      transition('void => in', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('0.4s ease-out')
      ]),
      transition('in => void', [
        animate('0.4s ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ]),
    trigger('bounceInOut2', [
      state('in', style({ transform: 'scale(1)' })),
      transition('void => in', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate('0.1s ease-out')
      ]),
      transition('in => void', [
        animate('0.1s ease-in', style({ transform: 'scale(0.9)', opacity: 0 }))
      ])
    ])
  ],
})
export class GenericDetailFormComponent extends ComponentFormBuilder implements OnInit {

  public bfs = inject(BasicFormService<any, any, any, any, any>);
  protected Store = inject(Store)
  public formDependencyService = inject(FormDependencySubscriber);
  public MessageService = inject(MessageService);
  public dialogService = inject(DialogService);

  @Input() detailFormProperties!: any
  @Input() pageType!: any
  @Input() detailFormData!: any
  @Input() inline!: any
  @Input() modal!: any
  @Input() set detailsLoadedData(value: any) {
  const newData = value.map((detail: any) => {
  const newObj: any = {};
   this.detailFormProperties.formData.forEach((key: any) => {
    newObj[key.name] = detail[key.name];
  });
    return newObj
  });
    console.log(newData)
    this.details.set(newData)
  }
  @Output() detailData: EventEmitter<any> = new EventEmitter()

  detailFormTableProperties = signal<any>([])
  detailsSharedProperties = signal<any>([])

  items!: MenuItem[];

  messageService = inject(MessageService)

  // selectedDetailItems: any[] = []; // Type should Be Set
  // detailsItems: (any & { account_name?: string })[] = []; // Type should Be Set
  // detailsForms: FormGroup<any>[] = []; // Type should Be Set
  // accountNames: Record<string, string> = {};
  // accountDialogRef?: DynamicDialogRef;

  get a() {
    console.log(this.detailData)
    console.log(this.form.value)
    return this.detailData
  }

  dependencyData = signal<any>(null)
  showForm = signal<boolean>(false)

  editMode = signal<boolean>(false)
    dependencies: {
    dependencyField: string,
    data: any
    }[] = []
  loadedDependencies = new BehaviorSubject<any>([])
  details = signal<any>([])
  inlineDetailFormGroups = new FormArray<any>([])
  inlineDetail = signal<any[]>([])
  currentDetail = signal<number>(0)

  @HostListener('document:keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent): void {
    if (this.showForm()) this.saveDetail()
  }

  ngOnInit(): void {

    this.buildForm(this.detailFormProperties.formData);
    this.registerDependencySubscribers();
    this.loadDependencies()
    this.buildDetailTableColumns(this.formProperties)

    if (this.pageType == PageType.View) {
        this.form.disable();
        this.loadData();
    }

  }

  //   registerLoadDataHandler() {
  //   this.Store.pipe(
  //     select(this.bfs.selectors.get.state),
  //     debounceTime(0),
  //     takeUntil(this.bfs.onDestroy$)
  //   ).subscribe(({ status, response }) => {
  //     this.bfs.showLoading.page.set(status === OperationStatus.InProgress);

  //     // this.title = response[this.config.field.title];
  //     // this.data = response;
  //     this.form.patchValue(response);
  //     console.log(response);

  //   });
  // }

  loadData() {
    this.details.set(this.detailFormData.details)
  }

    registerDependencySubscribers() {
      this.loadedDependencies.subscribe(res => {
      const data: any = {}
      res.forEach((dependency: any) => {
        data[dependency.dependencyField] = dependency.data
        this.dependencyData.set(data)
      })
    })
    }

    loadDependencies() {
    this.detailFormProperties.formData.filter((control: any) => {
      if (control.dependencyConfigs) this.dependencies.push({
        dependencyField: control.name,
        data: control.dependencyConfigs
      })
    })
    this.formDependencyService.dispatchDependencies(this.dependencies, this.Store)
      this.loadedDependencies.next(this.formDependencyService.dependenciesData())
    }


  saveDetail() {
      if (this.editMode()) {
        this.details.mutate((data: any[]) => {
          data[this.currentDetail()] = this.form.value
        })
        this.editMode.set(false)
      } else {
        this.details.set([...this.details(), this.form.value])
      }

      this.showForm.set(false)
      this.detailData.emit(this.details())
      this.form.reset()
  }

  cancelDetail() {
    this.showForm.set(false)
    this.form.reset()
  }

  editDetail(index: any) {
    if (!this.inline) {
      if (this.pageType == PageType.View) {
        return
      }
      this.editMode.set(true)
      this.showForm.set(true)
      this.currentDetail.set(index)
      this.form.patchValue(this.details()[index])
    }
  }

  removeDetail(index: any) {
    console.log(this.details()[index])
    if (this.pageType == PageType.View) {
      return
    }
    this.details.mutate((details: any[]) => details.splice(index, 1))
    this.detailData.emit(this.details())
  }

  buildDetailTableColumns(data: any) {

    this.detailFormTableProperties.set(this.formProperties.map(properties => {
      return {
        field: properties.name,
        header: properties.label
      }
    }))


  //   this.detailFormProperties().formData.forEach((res: any) => {
  // //     if (res.isShown) {

  // //       if (res.pairedAs)

  // //       this.detailFormTableProperties.set([...this.detailFormTableProperties(),
  // //         res.pairedAs ? {

  // //         },
  // //       {
  // //       name: res.name,
  // //       isShown: res.isShown
  // //       }
  // //       ])
  // //      }
  //   })


  }

  pushInlineDetail(index: any) {
    }




      getDetailsForms() {
      // return (
      //   (this.form.get('details') as FormArray)?.controls || []
      // ) as FormGroup<any>[]; // Type should Be Set
    }

    getDetailsItems() {
      // return (this.form.get('details')?.value || []) as any[]; // Type should Be Set
    }

    updateDetailsData() {
      // this.detailsForms = this.getDetailsForms();

      // for (const [index, form] of this.detailsForms.entries()) {
      //   form.get('je_detail_id')?.setValue(index + 1, { emitEvent: false });
      //   form.get('je_master_id')?.setValue(
      //     this.form.get('je_master_id')?.value || null,
      //     { emitEvent: false }
      //   );
      }

      // this.detailsItems = this.getDetailsItems();

  addDetailsItem() {
    if (!this.inline) {
      if (this.pageType !== PageType.View) this.showForm.set(true)
      return
    }
    // var newDetailForm = new FormGroup(this.newDetailForm())
    // this.inlineDetailFormGroups.push(newDetailForm)
    this.details.set([...this.details(), this.newDetail()])
    // console.log(this.inlineDetailFormGroups)
      // (this.form.get('details') as FormArray)?.push(this.getDetailForm());
  }

  newDetail() {
    var newData: any = {}
    this.detailFormProperties.formData.forEach((field: any) => {
      newData[field.name] = field.defaultValue
    })
    return newData
  }

  newDetailForm() {
    var newFormData: any = {}
    this.detailFormProperties.formData.forEach((field: any) => {
      newFormData[field.name] = new FormControl(field.defaultValue)
    })
    return newFormData
  }

    clearDetailsItems() {
      // (this.form.get('details') as FormArray)?.clear();
    }

    removeDetailsItem(index: number) {
      // (this.form.get('details') as FormArray)?.removeAt(index);
    }

    removeSelectedDetailsItems() {
      // for (const item of this.selectedDetailItems) {
      //   const detailsItems = this.getDetailsItems();
      //   const index = detailsItems.findIndex(i => i.je_detail_id === item.je_detail_id);
      //   this.removeDetailsItem(index);
      // }
      // this.selectedDetailItems = [];
    }



  ref!: DynamicDialogRef;

  show() {
    if (this.pageType == PageType.View) {
      return
    }
            this.ref = this.dialogService.open(PopupComponent, {
            header: `${this.pageType.charAt(0).toUpperCase() + this.pageType.slice(1)} Detail`,
            width: '70%',
            contentStyle: { overflow: 'auto' },
            closable: true,
            baseZIndex: 10000,
            maximizable: true,
          data: {
            form: this.formProperties,
            form2: this.form,
            dependencyData: this.dependencyData()
          },
          closeOnEscape: true,
        });

        this.ref.onClose.subscribe((product: any) => {
          if (product) {
            this.details.set([...this.details(), product])
            this.detailData.emit(this.details())
            this.form.reset()
            }
        });

        // this.ref.onMaximize.subscribe((value) => {
        //     this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        // });
    }


  edit(index: any) {
    if (this.pageType == PageType.View) {
      return
    }
        this.ref = this.dialogService.open(PopupComponent, {
            header: 'Select a Product',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            closable: true,
            baseZIndex: 10000,
            maximizable: true,
          data: {
            edit: true,
            form: this.formProperties,
            form2: this.form,
            dependencyData: this.dependencyData(),
            data:  this.details()[index]
          },
          closeOnEscape: true,
        });

      this.editMode.set(true)
      this.currentDetail.set(index)

        this.ref.onClose.subscribe((product: any) => {
          if (product) {
            this.details.mutate((data: any[]) => {
              data[this.currentDetail()] = this.form.value
            })
              this.detailData.emit(this.details())
              this.form.reset()
              this.editMode.set(false)
            }
        });

        // this.ref.onMaximize.subscribe((value) => {
        //     this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        // });
    }

}
