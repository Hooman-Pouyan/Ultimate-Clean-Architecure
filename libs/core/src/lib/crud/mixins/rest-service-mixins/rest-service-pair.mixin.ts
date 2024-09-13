import { map } from 'rxjs';
import { ListOrder } from '../../enums/list-order.enum';
import { RestListResponse, RestPairParams } from '../../models/rest.model';
import { BaseRestService } from '../../services/base-rest.service';


export class RestServicePairMixin extends BaseRestService {
  pair({ valueField, labelField, orderBy, orderDir, filter }: RestPairParams) {
    var params = {
      distinct_fields: [valueField, labelField],
      order: { [orderBy || labelField]: orderDir || ListOrder.ASC },
      filter
    };
    if (valueField !== "division_id") params.distinct_fields.push("division_id")
    const url = this.buildUrl();
    const options = { params: this.restApiService.buildListHttpParams(params) };

    return this.httpClient.get<RestListResponse<any[]>>(url, options).pipe(
      map(r => r.results.map(v => ({ value: v[valueField], label: v[labelField] })))
    );
  }
}