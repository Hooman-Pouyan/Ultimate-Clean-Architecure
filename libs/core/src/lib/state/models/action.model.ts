import { OperationStatus } from '../../common';
import { RestListResponse } from '../../crud';

export interface ActionFailure {
  message: string;
  status: OperationStatus;
}

export interface ActionSuccess {
  message?: string;
  status: OperationStatus;
}

export interface ActionList<T> {
  query?: T;
}

export interface ActionListSuccess<T> extends ActionSuccess {
  response: RestListResponse<T[]>;
}

export interface ActionPair<T> {
  query?: T;
}

export interface ActionPairSuccess<T> extends ActionSuccess {
  response: T[];
}

export interface ActionGet {
  query: string;
}

export interface ActionGetMutate<T> {
  request: T;
}

export interface ActionGetSuccess<T> extends ActionSuccess {
  response: T;
}

export interface ActionAdd<T> {
  request: T;
}

export interface ActionAddSuccess<T> extends ActionSuccess {
  response: T;
}

export interface ActionUpdate<T> {
  query: string;
  request: T;
}

export interface ActionUpdateSuccess<T> extends ActionSuccess {
  response: T;
}

export interface ActionDelete {
  query: string;
}

export interface ActionDeleteSuccess extends ActionSuccess {
  response: string;
}

export interface ActionSelect<T> {
  query: string;
}

export interface ActionSelectSuccess<T> extends ActionSuccess {
  response: T;
}
