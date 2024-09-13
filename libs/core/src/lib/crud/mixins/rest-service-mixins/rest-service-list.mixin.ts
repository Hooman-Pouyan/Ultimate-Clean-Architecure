import { RestListParams, RestListResponse } from '../../models/rest.model';
import { BaseRestService } from '../../services/base-rest.service';


export class RestServiceListMixin<T> extends BaseRestService {
  list(params?: RestListParams) {
    const url = this.buildUrl();
    const options = { params: this.restApiService.buildListHttpParams(params) };

    return this.httpClient.get<RestListResponse<T[]>>(url, options);
  }
} 