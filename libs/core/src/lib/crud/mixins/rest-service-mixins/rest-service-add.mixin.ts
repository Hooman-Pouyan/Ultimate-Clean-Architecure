import { BaseRestService } from "../../services/base-rest.service";

export class RestServiceAddMixin<I, O> extends BaseRestService {
  add(data: O, params?: any) {
    const url = this.buildUrl();
    const masterDetailUrl = "http://Clean-arch.ddns.net:3000/api/v1/erp/base/masterdetail";
    return this.httpClient.post<I>(params ? masterDetailUrl : url, data, { params: params });
  }
}
