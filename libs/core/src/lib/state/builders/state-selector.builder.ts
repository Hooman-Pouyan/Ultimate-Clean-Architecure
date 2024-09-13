import { createSelector } from '@ngrx/store';
import {
  AddState,
  DeleteState,
  GetState,
  ListState,
  PairState, SelectState,
  UpdateState
} from '../models/state.model';

export class StateSelectorBuilder {
  static list<MS, S extends ListState<any, any>>(selectList: (mainState: MS) => S) {
    return {
      list: {
        state: createSelector(selectList, (state: S) => state),
        query: createSelector(selectList, (state: S) => state.query),
        response: createSelector(selectList, (state: S) => state.response),
        message: createSelector(selectList, (state: S) => state.message),
        status: createSelector(selectList, (state: S) => state.status),
      }
    };
  }

  static pair<MS, S extends PairState<any, any>>(selectPair: (mainState: MS) => S) {
    return {
      pair: {
        state: createSelector(selectPair, (state: S) => state),
        query: createSelector(selectPair, (state: S) => state.query),
        response: createSelector(selectPair, (state: S) => state.response),
        message: createSelector(selectPair, (state: S) => state.message),
        status: createSelector(selectPair, (state: S) => state.status),
      }
    };
  }

  static get<MS, S extends GetState<any>>(selectGet: (mainState: MS) => S) {
    return {
      get: {
        state: createSelector(selectGet, (state: S) => state),
        query: createSelector(selectGet, (state: S) => state.query),
        response: createSelector(selectGet, (state: S) => state.response),
        message: createSelector(selectGet, (state: S) => state.message),
        status: createSelector(selectGet, (state: S) => state.status),
      }
    };
  }

  static add<MS, S extends AddState<any, any>>(selectAdd: (mainState: MS) => S) {
    return {
      add: {
        state: createSelector(selectAdd, (state: S) => state),
        request: createSelector(selectAdd, (state: S) => state.request),
        response: createSelector(selectAdd, (state: S) => state.response),
        message: createSelector(selectAdd, (state: S) => state.message),
        status: createSelector(selectAdd, (state: S) => state.status),
      }
    };
  }

  static update<MS, S extends UpdateState<any, any>>(selectUpdate: (mainState: MS) => S) {
    return {
      update: {
        state: createSelector(selectUpdate, (state: S) => state),
        query: createSelector(selectUpdate, (state: S) => state.query),
        request: createSelector(selectUpdate, (state: S) => state.request),
        response: createSelector(selectUpdate, (state: S) => state.response),
        message: createSelector(selectUpdate, (state: S) => state.message),
        status: createSelector(selectUpdate, (state: S) => state.status),
      }
    };
  }

  static delete<MS, S extends DeleteState<any>>(selectDelete: (mainState: MS) => S) {
    return {
      delete: {
        state: createSelector(selectDelete, (state: S) => state),
        query: createSelector(selectDelete, (state: S) => state.response),
        response: createSelector(selectDelete, (state: S) => state.response),
        message: createSelector(selectDelete, (state: S) => state.message),
        status: createSelector(selectDelete, (state: S) => state.status),
      }
    };
  }

  static select<MS, S extends SelectState<any>>(selectSelect: (mainState: MS) => S) {
    return {
      select: {
        state: createSelector(selectSelect, (state: S) => state),
        query: createSelector(selectSelect, (state: S) => state.response),
        response: createSelector(selectSelect, (state: S) => state.response),
        message: createSelector(selectSelect, (state: S) => state.message),
        status: createSelector(selectSelect, (state: S) => state.status),
      }
    };
  }
}