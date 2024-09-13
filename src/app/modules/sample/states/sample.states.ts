import {
  AddState,
  DeleteState,
  GetState,
  ListState,
  PairState,
  RestListParams,
  RestPairParams,
  SelectState,
  UpdateState,
  ValueLabel
} from 'projects/core/src/public-api';
import { Sample, SampleAdd, SampleUpdate } from '../models/sample.model';

export type SampleListState = ListState<Sample, RestListParams>
export type SamplePairState = PairState<ValueLabel, RestPairParams>
export type SampleGetState = GetState<Sample>
export type SampleAddState = AddState<Sample, SampleAdd>
export type SampleUpdateState = UpdateState<Sample, SampleUpdate>
export type SampleDeleteState = DeleteState<Sample>
export type SampleSelectState = SelectState<Sample>

export interface SampleStates {
  sampleList: SampleListState,
  samplePair: SamplePairState,
  sampleGet: SampleGetState,
  sampleAdd: SampleAddState,
  sampleUpdate: SampleUpdateState,
  sampleDelete: SampleDeleteState,
  sampleSelect: SampleSelectState,
}