import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AuthActions, authSelectors } from '../../projects/core/src/lib/auth/states';
import { fadeAnimation, OperationStatus } from '../../projects/core/src/lib/common';
import { AppStates } from './states/app.state';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService],
  animations: [fadeAnimation()]
})
export class AppComponent implements OnInit {
  private messageService = inject(MessageService);
  private appStore$ = inject(Store<AppStates>);
  private confirmationService = inject(ConfirmationService);

  userMenuItems: MenuItem[] = [{
    label: 'User Profile',
    items: [
      {
        label: 'Sign Out',
        icon: 'pi pi-exit',
        command: () => {
          this.signOutConfirm();
        }
      },
    ]
  }];
  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            this.update();
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.delete();
          }
        }
      ]
    },
    {
      label: 'Navigate',
      items: [
        {
          label: 'Angular',
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
        },
        {
          label: 'Router',
          icon: 'pi pi-upload',
          routerLink: '/fileupload'
        }
      ]
    }
  ];
  selectedCity: City | undefined;
  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  userAuthenticated = false;

  ngOnInit() {
    this.appStore$.pipe(
      select(authSelectors.check.status),
    ).subscribe((status) => {
      if (status === OperationStatus.Success) {
        this.userAuthenticated = true;
      } else if (status === OperationStatus.Failure) {
        this.userAuthenticated = false;
      }
    });
  }

  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated'
    });
  }

  delete() {
    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }

  signOut() {
    this.appStore$.dispatch(AuthActions.signOut());
  }

  signOutConfirm() {
    this.confirmationService.confirm({
      message: 'Are You sure you want to logout?',
      header: 'Sign Out',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.signOut(),
    });
  }
}
