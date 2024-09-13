import { inject, Injectable } from '@angular/core';
import { CoreMessageService, OperationStatus } from '../../common';
import { CommonState } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateMessageService {
  private coreMessageService = inject(CoreMessageService);

  failureSuccessObserver({ status, message }: CommonState) {
    if (status === OperationStatus.Failure) {
      this.coreMessageService.showError(message);
    } else if (status === OperationStatus.Success) {
      this.coreMessageService.showSuccess(message);
    }
  };

  failureObserver({ status, message }: CommonState) {
    if (status === OperationStatus.Failure) {
      this.coreMessageService.showError(message);
    }
  };
}
