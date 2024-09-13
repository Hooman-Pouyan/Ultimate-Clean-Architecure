import { OperationStatus } from '../../common';

export class StateInitialBuilder {
  static list<T>(type: string) {
    return {
      type,
      query: {},
      response: [],
      message: '',
      status: OperationStatus.Pending,
    } as T;
  }

  static pair<T>(type: string) {
    return {
      type,
      query: {},
      response: [],
      message: '',
      status: OperationStatus.Pending,
    } as T;
  }

  static get<T>(type: string) {
    return {
      type,
      query: '',
      response: {},
      message: '',
      status: OperationStatus.Pending,
    } as T;
  }

  static add<T>(type: string) {
    return {
      type,
      request: {},
      response: {},
      message: '',
      status: OperationStatus.Pending,
    } as T;
  }

  static update<T>(type: string) {
    return {
      type,
      query: '',
      request: {},
      response: {},
      message: '',
      status: OperationStatus.Pending,
    } as T;
  }

  static delete<T>(type: string) {
    return {
      type,
      query: '',
      response: '',
      message: '',
      status: OperationStatus.Pending,
    };
  }

  static select<T>(type: string) {
    return {
      type,
      query: '',
      response: {},
      message: '',
      status: OperationStatus.Pending,
    } as T;
  }
}
