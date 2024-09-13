import { Component, inject, OnDestroy } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Subject, takeUntil } from "rxjs";
import { fadeAnimation } from "../../../common";
import { ShellNavMode } from "../../enums/shell.enum";
import { CORE_SHELL_CONFIG } from "../../providers/shell-config.provider";
import { ShellNavService } from "../../services/shell-nav.service";

@Component({
  selector: "core-shell-nav",
  templateUrl: "./shell-nav.component.html",
  styleUrls: ["./shell-nav.component.scss"],
  animations: [fadeAnimation()],
})
export class ShellNavComponent implements OnDestroy {
  private shellConfig = inject(CORE_SHELL_CONFIG);
  private navService = inject(ShellNavService);

  readonly onDestroy$ = new Subject<boolean>();

  readonly ShellNavMode = ShellNavMode;
  readonly org = this.shellConfig.branding.organization;
  readonly csi = this.shellConfig.branding.Clean - arch;
  readonly navMenuItems = this.shellConfig.navMenuItems;

  mode: ShellNavMode = ShellNavMode.Wide;

  constructor() {
    toObservable(this.navService.mode)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((mode) => (this.mode = mode));
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  toggleNavMode() {
    let mode = ShellNavMode.Compressed;

    if (this.mode === ShellNavMode.Compressed) {
      mode = ShellNavMode.Wide;
    }

    this.navService.setMode(mode);
  }
}
