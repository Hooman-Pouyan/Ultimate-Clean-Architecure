import { DataType } from '../../common';

export interface InfoField {
  field: string;
  label: string;
  type?: DataType;
  format?: string;
}

export enum Valdiators {
  required = "required",
  minLength = "minLength",
  maxLength = "maxLength",
  nullable = "nullable",
  email = "email"
}

export enum formControlTypes {
  input = "input",
  description = "description",
  calender = "calender",
  number = "number",
  password = "password",
  division = "division",
  toggle = "boolean"
}

export interface MasterFormControl {
      name: string,
      classList: string
      type?: string,
      label?: string,
      isShown: boolean,
      Validators?: string[],
      defaultValue?: any
}


export interface numberFormControl extends MasterFormControl {
    inputId?: string
    maxFractionDigits?: number
    minFractionDigits?: number
    mode?: string
    min?: number
    max?: number
    currency?: string
    locale?: string
    currencyDisplay?: string
    suffix?: string
    prefix?: string
    showButtons?: boolean
    buttonLayout?: string
    step?: string
}

export interface calenderFormControl extends MasterFormControl {
        showButtonBar?: boolean
        selectionMode?: string
        readonlyInput?: string
        showTime?: boolean
        showSeconds?: boolean
        showWeek?: boolean
        dateFormat?: string
        touchUI?: boolean
}