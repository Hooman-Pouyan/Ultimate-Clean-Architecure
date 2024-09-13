import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CoreCommonConfig } from '../../common/models/config.model';
import { CORE_COMMON_CONFIG } from '../../common/providers/config.provider';
import { RestListParams } from '../models/rest.model';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(@Inject(CORE_COMMON_CONFIG) private coreConfig: CoreCommonConfig) {
  }

  buildUrl(paths: string[] = []) {
    return [this.coreConfig.rest.url, ...paths].filter((p) => !!p).join('/');
  }

  buildListHttpParams(params: RestListParams = {}) {
    const fromObject = {
      ...(
        params.page !== undefined &&
        { page: params.page }
      ),
      ...(
        params.take !== undefined &&
        { take: params.take }
      ),
      ...(
        Object.keys(params.order || {}).length &&
        { order: JSON.stringify(params.order) }
      ),
      ...(
        Object.keys(params.filter || {}).length &&
        { filter: JSON.stringify(params.filter) }
      ),
      ...(
        params.distinct_fields?.length &&
        { distinct_fields: params.distinct_fields.join(',') }
      ),
    };

    return new HttpParams({ fromObject });
  }
}
