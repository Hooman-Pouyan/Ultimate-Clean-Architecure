import { BaseRestService } from '../../services/base-rest.service';


export class RestServiceDeleteMixin<T> extends BaseRestService {
  delete(id: string) {
    const url = this.buildUrl([id]);
    return this.httpClient.delete(url);
  }
}