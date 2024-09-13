import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ValueLabel } from '../../common';
import { RestListParams, RestPairParams } from '../../crud/models/rest.model';
import {
  ActionAdd,
  ActionAddSuccess,
  ActionDelete,
  ActionDeleteSuccess,
  ActionFailure,
  ActionGet,
  ActionGetMutate,
  ActionGetSuccess,
  ActionList,
  ActionListSuccess,
  ActionPair,
  ActionPairSuccess,
  ActionSelect,
  ActionSelectSuccess,
  ActionUpdate,
  ActionUpdateSuccess
} from '../models/action.model';

export class StateActionBuilder {
  static list<T>(source: any) {
    return createActionGroup({
      source,
      events: {
        'List': props<ActionList<RestListParams>>(),
        'List Success': props<ActionListSuccess<T>>(),
        'List Failure': props<ActionFailure>(),
        'List Reset': emptyProps(),
      }
    });
  }

  static pair<T>(source: any) {
    return createActionGroup({
      source,
      events: {
        'Pair': props<ActionPair<Partial<RestPairParams>>>(),
        'Pair Success': props<ActionPairSuccess<ValueLabel>>(),
        'Pair Failure': props<ActionFailure>(),
        'Pair Reset': emptyProps(),
      }
    });
  }

  static get<T>(source: any) {
    return createActionGroup({
      source,
      events: {
        'Get': props<ActionGet>(),
        'Get Mutate': props<ActionGetMutate<T>>(),
        'Get Success': props<ActionGetSuccess<T>>(),
        'Get Failure': props<ActionFailure>(),
        'Get Reset': emptyProps(),
      }
    });
  }

  static add<I, O>(source: any) {
    return createActionGroup({
      source,
      events: {
        'Add': props<ActionAdd<O>>(),
        'Add Success': props<ActionAddSuccess<I>>(),
        'Add Failure': props<ActionFailure>(),
        'Add Reset': emptyProps(),
      }
    });
  }

  static update<I, O>(source: any) {
    return createActionGroup({
      source,
      events: {
        'Update': props<ActionUpdate<O>>(),
        'Update Success': props<ActionUpdateSuccess<I>>(),
        'Update Failure': props<ActionFailure>(),
        'Update Reset': emptyProps(),
      }
    });
  }

  static delete<T>(source: any) {
    return createActionGroup({
      source,
      events: {
        'Delete': props<ActionDelete>(),
        'Delete Success': props<ActionDeleteSuccess>(),
        'Delete Failure': props<ActionFailure>(),
        'Delete Reset': emptyProps(),
      }
    });
  }

  static select<T>(source: any) {
    return createActionGroup({
      source,
      events: {
        'Select': props<ActionSelect<T>>(),
        'Select Success': props<ActionSelectSuccess<T>>(),
        'Select Failure': props<ActionFailure>(),
        'Select Reset': emptyProps(),
      }
    });
  }
}



