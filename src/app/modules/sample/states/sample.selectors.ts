import { StateSelectorBuilder } from '../../../../../projects/core/src/lib/state';
import { AppStates } from '../../../states/app.state';
import {
  SampleAddState,
  SampleDeleteState,
  SampleGetState,
  SampleListState,
  SamplePairState,
  SampleSelectState,
  SampleUpdateState
} from './sample.states';

const selectSampleList = (state: AppStates) => state.sampleList;
const selectSamplePair = (state: AppStates) => state.samplePair;
const selectSampleGet = (state: AppStates) => state.sampleGet;
const selectSampleAdd = (state: AppStates) => state.sampleAdd;
const selectSampleUpdate = (state: AppStates) => state.sampleUpdate;
const selectSampleDelete = (state: AppStates) => state.sampleDelete;
const selectSampleSelect = (state: AppStates) => state.sampleSelect;

export const sampleSelectors = Object.freeze({
  ...StateSelectorBuilder.list<AppStates, SampleListState>(selectSampleList),
  ...StateSelectorBuilder.pair<AppStates, SamplePairState>(selectSamplePair),
  ...StateSelectorBuilder.get<AppStates, SampleGetState>(selectSampleGet),
  ...StateSelectorBuilder.add<AppStates, SampleAddState>(selectSampleAdd),
  ...StateSelectorBuilder.update<AppStates, SampleUpdateState>(selectSampleUpdate),
  ...StateSelectorBuilder.delete<AppStates, SampleDeleteState>(selectSampleDelete),
  ...StateSelectorBuilder.select<AppStates, SampleSelectState>(selectSampleSelect),
});