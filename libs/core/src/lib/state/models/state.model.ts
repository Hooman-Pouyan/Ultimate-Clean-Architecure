import { OperationStatus } from '../../common';
import { RestListResponse } from '../../crud';

export interface CommonState {
  type: string;
  message: string;
  status: OperationStatus;
}

export interface ListState<T, Q> extends CommonState {
  query: Q;
  response: RestListResponse<T[]>;
}

export interface PairState<T, Q> extends CommonState {
  query: Q;
  response: T[];
}

export interface GetState<T> extends CommonState {
  query: string;
  response: T;
}

export interface AddState<I, O> extends CommonState {
  request: O;
  response: I;
}

export interface UpdateState<I, O> extends CommonState {
  query: string;
  request: O;
  response: I;
}

export interface DeleteState<T> extends CommonState {
  query: string;
  response: string;
}

export interface SelectState<T> extends CommonState {
  query: string;
  response: T;
}
