import { createReducer, on } from '@ngrx/store';
import { OperationStatus } from '../../common';
import { StateActionBuilder } from './state-action.builder';
import { StateInitialBuilder } from './state-initial.builder';

export class StateReducerBuilder {
  static list<S, T>(actions = (StateActionBuilder.list<T>(''))) {
    return {
      list: createReducer(
        StateInitialBuilder.list<S>(actions.list.type),
        on(
          actions.list,
          (state, data) => ({ ...state, ...data, status: OperationStatus.InProgress })
        ),
        on(
          actions.listSuccess,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Success })
        ),
        on(
          actions.listFailure,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Failure })
        ),
        on(
          actions.listReset,
          (state) => ({ ...state, ...StateInitialBuilder.list<S>(actions.list.type) })
        ),
      ),
    };
  }

  static pair<S, T>(actions = (StateActionBuilder.pair<T>(''))) {
    return {
      pair: createReducer(
        StateInitialBuilder.pair<S>(actions.pair.type),
        on(
          actions.pair,
          (state, data) => ({
            ...state, ...(data && { data }),
            status: OperationStatus.InProgress
          })
        ),
        on(
          actions.pairSuccess,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Success })
        ),
        on(
          actions.pairFailure,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Failure })
        ),
        on(
          actions.pairReset,
          (state) => ({ ...state, ...StateInitialBuilder.pair<S>(actions.pair.type) })
        ),
      ),
    };
  }

  static get<S, T>(actions = (StateActionBuilder.get<T>(''))) {
    return {
      get: createReducer(
        StateInitialBuilder.get<S>(actions.get.type),
        on(
          actions.get,
          (state, data) => ({ ...state, ...data, status: OperationStatus.InProgress })
        ),
        on(
          actions.getMutate,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Pending })
        ),
        on(
          actions.getSuccess,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Success })
        ),
        on(
          actions.getFailure,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Failure })
        ),
        on(
          actions.getReset,
          (state) => ({ ...state, ...StateInitialBuilder.get<S>(actions.get.type) })
        ),
      ),
    };
  }

  static add<S, I, O>(actions = (StateActionBuilder.add<I, O>(''))) {
    return {
      add: createReducer(
        StateInitialBuilder.add<S>(actions.add.type),
        on(
          actions.add,
          (state) => ({ ...state, status: OperationStatus.InProgress })
        ),
        on(
          actions.addSuccess,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Success })
        ),
        on(
          actions.addFailure,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Failure })
        ),
        on(
          actions.addReset,
          (state) => ({ ...state, ...StateInitialBuilder.add<S>(actions.add.type) })
        ),
      ),
    };
  }

  static update<S, I, O>(actions = (StateActionBuilder.update<I, O>(''))) {
    return {
      update: createReducer(
        StateInitialBuilder.update<S>(actions.update.type),
        on(
          actions.update,
          (state, data) => ({ ...state, ...data, status: OperationStatus.InProgress })
        ),
        on(
          actions.updateSuccess,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Success })
        ),
        on(
          actions.updateFailure,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Failure })
        ),
        on(
          actions.updateReset,
          (state) => ({ ...state, ...StateInitialBuilder.update<S>(actions.update.type) })
        ),
      ),
    };
  }

  static delete<S, T>(actions = (StateActionBuilder.delete<T>(''))) {
    return {
      delete: createReducer(
        StateInitialBuilder.delete<S>(actions.delete.type),
        on(
          actions.delete,
          (state, data) => ({ ...state, ...data, status: OperationStatus.InProgress })
        ),
        on(
          actions.deleteSuccess,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Success })
        ),
        on(
          actions.deleteFailure,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Failure })
        ),
        on(
          actions.deleteReset,
          (state) => ({ ...state, ...StateInitialBuilder.delete<S>(actions.delete.type) })
        ),
      ),
    };
  }

  static select<S, T>(actions = (StateActionBuilder.select<T>(''))) {
    return {
      select: createReducer(
        StateInitialBuilder.select<S>(actions.select.type),
        on(
          actions.select,
          (state, data) => ({ ...state, ...data, status: OperationStatus.InProgress })
        ),
        on(
          actions.selectSuccess,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Success })
        ),
        on(
          actions.selectFailure,
          (state, data) => ({ ...state, ...data, status: OperationStatus.Failure })
        ),
        on(
          actions.selectReset,
          (state) => ({ ...state, ...StateInitialBuilder.select<S>(actions.select.type) })
        ),
      ),
    };
  }
}
