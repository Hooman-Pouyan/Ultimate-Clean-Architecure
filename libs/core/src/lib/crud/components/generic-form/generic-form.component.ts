import { Component, EventEmitter, Input, Output, effect, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, debounceTime, filter, first, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BasicFormService } from '../../services/basic-form.service';
import { DropdownDataService } from '../../services/dropdown-data.service';
import { PageType } from '../../enums/page.enum';
import { OperationStatus } from '../../../common'
import { CoreToolbar } from '../../models/toolbar.model';
import { ComponentFormBuilder } from '../../builders/form-builder';
import { FormDependencySubscriber } from '../../services/FormDependencySybscriber.service';


@Component({
  selector: 'core-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
  providers: [
    BasicFormService,
    DropdownDataService,
    DialogService,
    FormDependencySubscriber
  ]
})
export class CoreFormComponent extends ComponentFormBuilder {
  public bfs = inject(BasicFormService<any, any, any, any, any>);
  public formDependencyService = inject(FormDependencySubscriber);
  protected dropdownDataService = inject(DropdownDataService);
  protected dialogService = inject(DialogService);
  protected divisionStore$ = inject(Store)

  readonly onDestroy$ = new Subject<boolean>();
  readonly PageType = PageType;
  @Input() id = '';
  @Input({ required: true}) pageType!: any;
  @Input() divisionSelectors!: any;
  @Input() typeSelector!: any;
  @Input({ required: true}) store!: any;
  @Input({ required: true}) selectors!: any;
  @Input({ required: true}) actions!: any;
  @Input({ required: true }) configs: any;
  @Input() detailSelectors!: any;
  @Input() detailActions!: any;
  @Input() formControls!: any[];
  @Input() masterDetail: string | undefined = undefined
  @Input() inline!: boolean
  @Input() modal!: boolean
  @Input() isDivision!: boolean

  @Output() formEmit = new EventEmitter()
  @Output() pageTypeEmit = new EventEmitter()

  detailFormProperties = signal<any>([])
  currentDivision = signal<any>({})

  toolbar!: CoreToolbar;
  data = this.bfs.data;
  save = this.bfs.save;
  detailData = signal<any>([])
  formControlHasError = this.bfs.formControlHasError;
  showLoading = this.bfs.showLoading
  currencyDropdown!: any;
  selectedDetailItems: any[] = []; // Type should Be Set
  detailsItems: (any & { account_name?: string })[] = []; // Type should Be Set
  detailsForms: FormGroup<any>[] = []; // Type should Be Set
  accountNames: Record<string, string> = {};
  accountDialogRef?: DynamicDialogRef;
  dependencies: {
    dependencyField: string,
    data: any
  }[] = []
  loadedDependencies = new BehaviorSubject<any>([])
  dependencyData = signal<any>(null)
  typeName: any

  a = effect(() => {
    if (this.detailData() != 5) {
      console.log(this.detailData())
    }
  })

  ngOnInit() {
    this.buildForm(this.formControls)
    this.buildDetailForm(this.formControls.filter(formProps => formProps.name == 'details')[0])
    if (this.divisionSelectors) this.getCurrenctDivision()
    this.bfs.id = this.id;
    this.bfs.pageType = this.pageType;
    this.bfs.form = this.form;
    this.bfs.config = this.configs;
    this.bfs.actions = this.actions;
    this.bfs.detailActions = this.detailActions;
    this.bfs.selectors = this.selectors;
    this.bfs.detailSelectors = this.detailSelectors;
    this.bfs.masterDetail = this.masterDetail
    this.bfs.details = this.detailData
    this.toolbar = this.bfs.getToolbar()!;

    this.bfs.init();
    setTimeout(() => {
      this.formEmit.emit(this.form.value[this.typeName])
    }, 1000)

    this.pageTypeEmit.emit(this.pageType)

    // this.registerFormEventsSubscriber();
    this.registerDependencySubscribers();
    this.loadDependencies();
    this.checkIfHasTypes()

    this.store.pipe(
      select(this.selectors.add.response),
      takeUntil(this.onDestroy$ || of(this.bfs.pageType == PageType.Add))
    ).subscribe((res: any) => {
      if (this.pageType == PageType.Add) {
        this.id = this.masterDetail == undefined ? res.id : res.master.id
        this.bfs.id = this.id
       }
      if ((res.id || res.master.id) && this.pageType == PageType.Add) {
        console.log(this.id)
        console.log(this.bfs.id)
        this.bfs.navigateToViewPage()
      }
    });
  }


  checkIfHasTypes() {
        this.formControls.forEach(control => {
          if (control.type == "type") {
            this.loadTypes(control.name)
            this.typeName = control.name
          }
        })
    }

  getCurrenctDivision() {
  this.divisionStore$.pipe(
    takeUntil(this.bfs.onDestroy$),
    select(this.divisionSelectors.select.status),
    filter(status => status === OperationStatus.Success),
    switchMap(() => this.divisionStore$.pipe(select(this.divisionSelectors.select.query))), take(1))
    .subscribe((currentDivision: any) => {
      this.currentDivision.set(currentDivision)
        this.form.patchValue({
        division_id: +currentDivision.id
      })
    })
}

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
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
    this.formControls.filter(control => {
      if (control.dependencyConfigs) this.dependencies.push({
        dependencyField: control.name,
        data: control.dependencyConfigs
      })
    })
    this.formDependencyService.dispatchDependencies(this.dependencies, this.store)
    this.loadedDependencies.next(this.formDependencyService.dependenciesData())
    }

  loadTypes(typeName: string) {
    this.divisionStore$.pipe(
      select(this.typeSelector.select.state),
      filter(response => response.status == OperationStatus.Success),
    ).subscribe(({ response }) => {
      console.log(this.pageType)
      console.log(response)
      this.form.get(typeName)?.setValue(response)
    }
    )
  }

    getDetailForm() {
      return new FormGroup<any>({ // Type should Be Set
        division_id: new FormControl(+this.currentDivision().id),
        je_detail_id: new FormControl(0),
        je_master_id: new FormControl(null),
        account_id: new FormControl(null),
        debit: new FormControl(0),
        credit: new FormControl(0),
        notes: new FormControl(null),
      });
    }

    // registerFormEventsSubscriber() {
    //   this.form.valueChanges
    //     .pipe(
    //       debounceTime(200),
    //       takeUntil(this.onDestroy$)
    //     )
    //     .subscribe(() => this.updateDetailsData());

    //   this.form.get('details')!.valueChanges
    //     .pipe(
    //       debounceTime(200),
    //       filter(v => v.length !== this.detailsItems.length),
    //       takeUntil(this.onDestroy$)
    //     )
    //     .subscribe(() => this.updateDetailsData());
    // }

    // beforePatchForm(data: any) { // Type should Be Set
    //   this.clearDetailsItems();

    //   for (let i = 0; i < data.details?.length; i++) {
    //     this.addDetailsItem();
    //   }
    // }

    // openAccountCodeDialog(detailsForm: FormGroup<any>) { // Type should Be Set
    //   this.accountDialogRef = this.dialogService.open(AccountCodeComponent, {
    //     header: 'Select an Account',
    //     width: '70%',
    //     contentStyle: { overflow: 'auto' },
    //     baseZIndex: 10000,
    //   });

    //   this.accountDialogRef.onClose
    //     .pipe(first(), takeUntil(this.onDestroy$))
    //     .subscribe((response: { code: string | number | null; name: string; }) => {
    //       if (!response) {
    //         return;
    //       }

    //       // detailsForm?.get('account_id')?.setValue(response.code);
    //       // this.accountNames[response.code] = response.name;
    //       this.updateDetailsData();
    //     });
    // }



  buildDetailForm(detailFormProperties: any) {
    this.detailFormProperties.set(detailFormProperties)
  }

  setDetail(detailData: any) {
    // console.log(this.detailFormProperties().formData.filter((data: any) => data.isShared).forEach((data: any) => {
    // }))

    this.form.patchValue({
      details: detailData
    })
  }




  }