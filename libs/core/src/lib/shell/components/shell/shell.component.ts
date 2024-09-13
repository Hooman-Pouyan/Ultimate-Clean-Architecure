import { Component, effect, HostBinding, inject, OnDestroy, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { ShellNavMode, progressStatusColor } from '../../enums/shell.enum';
import { ShellNavService } from '../../services/shell-nav.service';
import { ShellProgressbarService } from '../../services/shell-progressbar.service';
import { BasicListService } from '../../../crud/services/basic-list.service';
import { VersionService } from '../../../crud';

@Component({
  selector: 'core-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class SellComponent implements OnDestroy, OnInit {
  private navService = inject(ShellNavService);
  private progressbarService = inject(ShellProgressbarService);
  readonly onDestroy$ = new Subject<boolean>();

  versionservice = inject(VersionService)

  mode: ShellNavMode = ShellNavMode.Wide;
  progressValue = 0;
  progressbarHidden = false;
  progressStatusColor: string = progressStatusColor.InProgress

  @HostBinding('class') styleClass = this.buildStyleClass(this.mode);

  constructor() {
    toObservable(this.navService.mode)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(mode => {
        this.mode = mode;
        this.styleClass = this.buildStyleClass(this.mode);
      });

    toObservable(this.progressbarService.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.progressbarHidden = value === this.progressbarService.startValue;

        setTimeout(() => {
          this.progressbarHidden = (value === this.progressbarService.endValue);
            this.progressStatusColor = progressStatusColor.Completed
            setTimeout(() => {
            this.progressStatusColor = progressStatusColor.InProgress
            }, 700);
        }, 1500);

        this.progressValue = value;
      });
  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  buildStyleClass(mode: ShellNavMode) {
    return `shell-nav-${mode.toLowerCase()}`;
  }
}
