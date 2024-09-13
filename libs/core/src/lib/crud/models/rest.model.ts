import { ListOrder } from '../enums/list-order.enum';

export interface RestListParams {
  page?: number;
  take?: number;
  order?: Record<string, ListOrder>;
  filter?: {};
  distinct_fields?: string[];
}

export interface RestPairParams {
  valueField: string;
  labelField: string;
  orderBy?: string;
  orderDir?: ListOrder;
  filter?: {};
}

export interface RestListPageInfo {
  page: number;
  result_per_page: number;
  total_pages: number;
  total_results: number;
}

export interface RestListResponse<T> {
  results: T;
  page_info: RestListPageInfo;
}

export interface RestError {
  code: number;
  method: string;
  path: string;
  reason: string;
  timestamp: string;
}