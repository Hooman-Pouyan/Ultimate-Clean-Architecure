import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable()
export class BaseRestService {
  endpoint = '';

  protected httpClient = inject(HttpClient);
  protected restApiService = inject(RestApiService);

  buildUrl(paths: string[] = []) {
    return this.restApiService.buildUrl([this.endpoint, ...paths]);
  }
}
