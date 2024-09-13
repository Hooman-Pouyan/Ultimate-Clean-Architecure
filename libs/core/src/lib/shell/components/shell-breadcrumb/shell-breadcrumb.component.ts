import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  signal
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ShellBreadcrumbService } from '../../services/shell-breadcrumb.service';

@Component({
  selector: 'core-shell-breadcrumb',
  templateUrl: './shell-breadcrumb.component.html',
  styleUrls: ['./shell-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellBreadcrumbComponent implements OnDestroy {
  private changeDetectionRef = inject(ChangeDetectorRef);
  private breadcrumbService = inject(ShellBreadcrumbService);

  readonly onDestroy$ = new Subject<boolean>();
  items = signal<MenuItem[]>([]);
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor() {
    toObservable(this.breadcrumbService.items).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((items) => {
      this.items.set(items.slice(0, items.length));
      this.changeDetectionRef.detectChanges();

      setTimeout(() => {
        this.items.set(items);
        this.changeDetectionRef.detectChanges();
      }, 0);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
}
