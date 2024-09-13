import { AfterViewInit, Component, computed, effect, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BasicFormService,
  CoreFormComponent,
  CoreToolbar,
  DropdownDataService,
  OperationStatus,
  PageType,
  VersionService
} from 'projects/core/src/public-api';
import { SampleStates } from '../../states/sample.states';
import { sampleConfig } from '../../sample.config';
import { SampleActions } from '../../states/sample.actions';
import { sampleSelectors } from '../../states/sample.selectors';
import { DialogService } from 'primeng/dynamicdialog';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
  providers: [BasicFormService, DropdownDataService, DialogService]

})
export class SampleFormComponent implements OnInit, AfterViewInit {

  readonly PageType = PageType;
  @Input() pageType = PageType.View;
  @Input() id = '';

  versionservice = inject(VersionService)


  store = inject(Store<SampleStates>)
  selectors = sampleSelectors
  actions = SampleActions
  configs = sampleConfig

  FormMasterControls = signal<any[]>([
      {
      name: 'id',
      isShown: false,
      // Validators: [Valdiators.required]
  },
    {
      name: 'division_id',
      type: "division",
      label: "Division",
      isShown: true,
      defaultValue: "1"
      // Validators: [Valdiators.required]
    },
      {
      name: 'code',
      type: "number",
      label: "Code",
      inputId: "integeronly",
      isShown: true,
      min: 5,
      currencyDisplay: 'code',
      mode: 'currency',
      currency: "EUR",
      locale: "de-DE"
      // Validators: [Valdiators.required]
    },
          {
      name: 'active',
      type: "toggle",
      label: "active",
      isShown: true,
      defaultValue: true,
      templateType: "toggle",
      disabled: true
      // Validators: [Valdiators.required]
    },
     {
      name: 'je_master_date',
      type: "calender",
      label: "Date",
      isShown: true,
      // Validators: [Valdiators.required],
      defaultValue: new Date()
    },
    {
      name: 'je_master_status',
      type: "input",
      label: "JE State",
      isShown: true,
      // Validators: [Valdiators.required],
      defaultValue: "Draft"
    },
    {
      name: 'notes',
      type: "input",
      label: "Notes",
      required: true,
      isShown: true,
      // Validators: [Valdiators.required]
    },
    //             {
    //   name: 'product_type',
    //   type: "dropdown",
    //   typeValue: "product_types",
    //   label: "Product Type",
    //   isShown: true,
    //   dependency: false,
    //   defaultValue: [],
    //   options: [
    //     { value: 1, label: 6  },
    //     { value: 2, label: 5 }
    //               ],
    //   optionValue: "value",
    //   optionLabel: "label",
    //   dependencyConfigs: {
    //     code: 'id',
    //     title: 'uom',
    //     action: this.actions.pair({}),
    //     selector: this.selectors.pair.state
    //   }
    //   // Validators: [Valdiators.required]
    // },
      {
      name: 'details',
      type: "detail",
      isShown: false,
      defaultValue: [],
      formData: [
    {
      name: 'id',
      isShown: false,
      // Validators: [Valdiators.required]
  },
    {
      name: 'division_id',
      type: "division",
      label: "Division",
      isShown: false,
      isShared: true,
      defaultValue: "1"
      // Validators: [Valdiators.required]
    },
        {
      name: 'division_name',
      type: "division",
      label: "Division",
      isShown: false,
      isShared: true
      // Validators: [Valdiators.required]
    },
        {
      name: 'product_type',
      type: "dropdown",
      typeValue: "product_types",
      label: "Product Type",
      isShown: true,
      defaultValue: [],
      showLabel: true,
      dependency: true,
      placeHolder: "Select Products",
      dependencyConfigs: {
        labelAsValue: false,
        code: 'id',
        title: 'uom',
        action: this.actions.pair({}),
        selector: this.selectors.pair.state
      }
      // Validators: [Valdiators.required]
    },
      {
      name: 'product_name',
      type: "input",
      label: "product_name",
      isShown: true,
      showLabel: true,
      defaultValue: true,
      templateType: "toggle",
      disabled: true,
      pairedAs: "product",
      // Validators: [Valdiators.required]
    },
     {
      name: 'is_seq',
      type: "input",
      label: "is_seq",
      isShown: true,
      showLabel: true,
      // Validators: [Valdiators.required],
    },
    {
      name: 'is_batch',
      type: "input",
      label: "is_batch",
      isShown: true,
      showLabel: true,
      // Validators: [Valdiators.required],
      defaultValue: "Draft"
    },
    {
      name: 'quantity',
      type: "input",
      label: "quantity",
      isShown: true,
      showLabel: true,
      required: true
      // Validators: [Valdiators.required]
    },
        {
      name: 'uom',
      type: "input",
      label: "uom",
      isShown: true,
      showLabel: true,
      defaultValue: [],
      required: true
      // Validators: [Valdiators.required]
        },
                {
      name: 'cost',
      type: "input",
      label: "cost",
      isShown: true,
      showLabel: true,
      defaultValue: []
      // Validators: [Valdiators.required]
        },
                                {
      name: 'currency_code',
      type: "input",
      label: "currency_code",
      isShown: true,
      showLabel: true,
      defaultValue: "",
      required: true,
      // Validators: [Valdiators.required]
        },
                                {
      name: 'note',
      type: "input",
      label: "note",
      isShown: true,
      showLabel: true,
      defaultValue: []
      // Validators: [Valdiators.required]
        },
                                                                {
      name: 'remaining',
      type: "input",
      label: "remaining",
      isShown: true,
      showLabel: true,
      defaultValue: ""
      // Validators: [Valdiators.required]
    },
      ]
      // Validators: [Valdiators.required]
    },

  ])

      @ViewChild("form", {static: true}) from!: CoreFormComponent;
  ngAfterViewInit(): void {

              //  console.log(this.from.form.controls);
    }

  selectedTypeDetailId: any;

  ngOnInit() {
    this.versionservice.getPackageInfo().subscribe(console.log)

    this.store.dispatch(this.actions.listSuccess({ response: {results: [
    {
        id: "4",
  code: "string",
  active: true,
  title: "string",
  da te: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    },
        {
        id: "1",
  code: "string",
  active: true,
  title: "string",
  date: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    },
            {
        id: "2",
  code: "string",
  active: true,
  title: "string",
  date: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    },
                {
        id: "3",
  code: "string",
  active: true,
  title: "string",
  date: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    }
    ], page_info:
 {
    "total_results": 4,
    "total_pages": 1,
    "page": 1,
    "result_per_page": 10
  }
  }, status: OperationStatus.Success, message: ""
    }))

    const a =     {
        id: "4",
  code: "string",
  active: true,
  title: "string",
  date: new Date(),
  description: "string",
  status: null,
  details: [],
  divisionId: "string",
    }

    setTimeout(() => {
    this.store.dispatch(this.actions.selectSuccess({response: a, status: OperationStatus.Success}))
    }, 2000);
  }



}
