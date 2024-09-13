import { CorePaginator } from '../models/pagination.model';

export class PaginationBuilder {
  static paginator(): CorePaginator {
    return {
      rows: 25,
      page: 0,
      first: 0,
      pages: 0,
      total: 0
    };
  }

  static rowsPerPageOptions() {
   return [5, 10, 25, 50, 100, 200];
  }
}