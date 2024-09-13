import { StateReducerBuilder } from '../../../../../projects/core/src/lib/state';
import { Sample, SampleAdd, SampleUpdate } from '../models/sample.model';
import {
  SampleAddActions,
  SampleDeleteActions,
  SampleGetActions,
  SampleListActions,
  SamplePairActions,
  SampleSelectActions,
  SampleUpdateActions
} from './sample.actions';
import {
  SampleAddState,
  SampleDeleteState,
  SampleGetState,
  SampleListState,
  SamplePairState,
  SampleUpdateState
} from './sample.states';


export const sampleReducers = {
  sampleList: (StateReducerBuilder.list<SampleListState, Sample>(SampleListActions)).list,
  samplePair: (StateReducerBuilder.pair<SamplePairState, Sample>(SamplePairActions)).pair,
  sampleGet: (StateReducerBuilder.get<SampleGetState, Sample>(SampleGetActions)).get,
  sampleAdd: (StateReducerBuilder.add<SampleAddState, Sample, SampleAdd>(SampleAddActions)).add,
  sampleUpdate: (StateReducerBuilder.update<SampleUpdateState, Sample, SampleUpdate>(SampleUpdateActions)).update,
  sampleDelete: (StateReducerBuilder.delete<SampleDeleteState, Sample>(SampleDeleteActions)).delete,
  sampleSelect: (StateReducerBuilder.select<SampleDeleteState, Sample>(SampleSelectActions)).select,
};