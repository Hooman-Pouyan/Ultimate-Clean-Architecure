import { StateActionBuilder } from '../../../../../projects/core/src/lib/state';
import { Sample, SampleAdd, SampleUpdate } from '../models/sample.model';

const SOURCE = 'Sample';

export const SampleListActions = StateActionBuilder.list<Sample>(SOURCE);
export const SamplePairActions = StateActionBuilder.pair<Sample>(SOURCE);
export const SampleGetActions = StateActionBuilder.get<Sample>(SOURCE);
export const SampleAddActions = StateActionBuilder.add<Sample, SampleAdd>(SOURCE);
export const SampleUpdateActions = StateActionBuilder.update<Sample, SampleUpdate>(SOURCE);
export const SampleDeleteActions = StateActionBuilder.delete<Sample>(SOURCE);
export const SampleSelectActions = StateActionBuilder.select<Sample>(SOURCE);

export const SampleActions = {
  ...SampleListActions,
  ...SamplePairActions,
  ...SampleGetActions,
  ...SampleAddActions,
  ...SampleUpdateActions,
  ...SampleDeleteActions,
  ...SampleSelectActions
};
