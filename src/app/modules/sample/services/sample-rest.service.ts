import { Injectable } from '@angular/core';
import { applyMixins } from 'rxjs/internal/util/applyMixins';
import {
  BaseRestService,
  RestServiceAddMixin,
  RestServiceDeleteMixin,
  RestServiceGetMixin,
  RestServiceListMixin,
  RestServicePairMixin,
  RestServiceUpdateMixin
} from '../../../../../projects/core/src/lib/crud';
import { Sample, SampleAdd, SampleUpdate, } from '../models/sample.model';
import { sampleConfig } from '../sample.config';

@Injectable({
  providedIn: 'root'
})
export class SampleRestService extends BaseRestService {
  override readonly endpoint = sampleConfig.rest.endpoint;
}

export interface SampleRestService
  extends RestServiceListMixin<Sample>,
    RestServicePairMixin,
    RestServiceGetMixin<Sample>,
    RestServiceAddMixin<Sample, SampleAdd>,
    RestServiceUpdateMixin<Sample, SampleUpdate>,
    RestServiceDeleteMixin<Sample> {
}

applyMixins(SampleRestService, [
    RestServiceListMixin<Sample>,
    RestServicePairMixin,
    RestServiceGetMixin<Sample>,
    RestServiceAddMixin<Sample, SampleAdd>,
    RestServiceUpdateMixin<Sample, SampleUpdate>,
    RestServiceDeleteMixin<Sample>,
  ]
);