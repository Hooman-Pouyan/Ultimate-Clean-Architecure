import { FormArray, FormGroup } from '@angular/forms';
import { TypedForm } from 'projects/core/src/public-api';
import { SampleStatus } from '../enums/sample-status.enum';

export interface SampleDetail {
  id: string;
  debit: number;
  credit: number;
  description: string;
  sampleId: string;
  accountId: string;
  divisionId: string;
}

export interface Sample {
  id: string;
  code: string;
  active: boolean;
  title: string;
  date: Date;
  description: string;
  status?: SampleStatus| null;
  details: SampleDetail[];
  divisionId: string;
}

export type SampleAdd = Omit<Sample, 'id'>;
export type SampleUpdate = Sample
export type SampleDetailForm = TypedForm<SampleDetail>;
export type SampleForm = TypedForm<Omit<Sample, 'details'>> & {
  details: FormArray<FormGroup<SampleDetailForm>>
}
