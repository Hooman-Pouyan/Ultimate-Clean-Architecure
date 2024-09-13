import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, of, switchMap, take } from 'rxjs';
import { formatErrorMessage, OperationStatus } from '../../../../../projects/core/src/lib/common';
import { RestPairParams } from '../../../../../projects/core/src/lib/crud';
import { sampleConfig } from '../sample.config';
import { SampleRestService } from '../services/sample-rest.service';
import { SampleActions } from './sample.actions';

const idIsRequired = () => {
  return of(SampleActions.getFailure({
    message: 'ID of Sample is required',
    status: OperationStatus.Failure
  }));
};

@Injectable()
export class SampleEffects {
  private actions$ = inject(Actions);
  private sampleRestService = inject(SampleRestService);

  listSample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SampleActions.list),
      switchMap(({ query }) =>
        this.sampleRestService.list(query).pipe(
          map(response => SampleActions.listSuccess({
            response,
            status: OperationStatus.Success
          })),
          catchError(({ error }) => of(SampleActions.listFailure({
            message: formatErrorMessage(error),
            status: OperationStatus.Failure
          })))
        )
      )
    )
  );
  pairSample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SampleActions.pair),
      switchMap(({ query }) => {
        const params = {
          valueField: query?.valueField || sampleConfig.field.code,
          labelField: query?.labelField || sampleConfig.field.title,
          ...query
        } as RestPairParams;

        return this.sampleRestService.pair(params).pipe(
          map(response => SampleActions.pairSuccess({
            response,
            status: OperationStatus.Success
          })),
          catchError(({ error }) => of(SampleActions.pairFailure({
            message: formatErrorMessage(error),
            status: OperationStatus.Failure
          })))
        );
      })
    )
  );
  getSample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SampleActions.get),
      switchMap(({ query }) => {
        if (!query) {
          return idIsRequired();
        }

        return this.sampleRestService
          .get(query)
          .pipe(
            map(response => SampleActions.getSuccess({
              response,
              status: OperationStatus.Success
            })),
            catchError(({ error }) => of(SampleActions.getFailure({
              message: formatErrorMessage(error),
              status: OperationStatus.Failure
            })))
          );
      })
    )
  );
  addSample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SampleActions.add),
      switchMap(({ request }) =>
        this.sampleRestService
          .add(request, {
            masterEntity: "transaction_master",
            detailEntity: "transaction_detail",
          })
          .pipe(
            map(response =>
              SampleActions.addSuccess({
                response,
                message: 'Bank Account added successfully',
                status: OperationStatus.Success
              })),
            catchError(({ error }) => of(SampleActions.addFailure({
              message: formatErrorMessage(error),
              status: OperationStatus.Failure
            })))
          )
      )
    )
  );
  updateSample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SampleActions.update),
      switchMap(({ query, request }) => {
        if (!query) {
          return idIsRequired();
        }

        return this.sampleRestService
          .update(query, request)
          .pipe(
            map(response => SampleActions.updateSuccess({
              response,
              message: 'Bank Account updated successfully',
              status: OperationStatus.Success
            })),
            catchError(({ error }) => of(SampleActions.updateFailure({
              message: formatErrorMessage(error),
              status: OperationStatus.Failure
            })))
          );
      })
    )
  );
  deleteSample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SampleActions.delete),
      switchMap(({ query }) => {
        if (!query) {
          return idIsRequired();
        }

        return this.sampleRestService
          .delete(query)
          .pipe(
            map(() => SampleActions.deleteSuccess({
              response: query,
              message: 'Bank Account deleted successfully',
              status: OperationStatus.Success
            })),
            catchError(({ error }) => of(SampleActions.deleteFailure({
              message: formatErrorMessage(error),
              status: OperationStatus.Failure
            })))
          );
      })
    )
  );
}

