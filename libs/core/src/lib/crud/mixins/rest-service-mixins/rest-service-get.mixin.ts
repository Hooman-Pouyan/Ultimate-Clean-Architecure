import { BaseRestService } from '../../services/base-rest.service';


export class RestServiceGetMixin<T> extends BaseRestService {
  get(id: string) {
    const url = this.buildUrl([id]);
    return this.httpClient.get<T>(url);
  }
}