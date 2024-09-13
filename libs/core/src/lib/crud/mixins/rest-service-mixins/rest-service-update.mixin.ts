import { BaseRestService } from "../../services/base-rest.service";

export class RestServiceUpdateMixin<I, O> extends BaseRestService {
  update(id: string, data: O, params?: any) {
    const url = this.buildUrl([id]);
    const masterDetailUrl = "http://Clean-arch.ddns.net:3000/api/v1/erp/base/masterdetail/" + id;
    return this.httpClient.patch<I>(params ? masterDetailUrl : url, data, { params: params });
  }
}
