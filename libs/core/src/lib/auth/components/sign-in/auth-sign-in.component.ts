import { NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { Subject, takeUntil } from "rxjs";
import { OperationStatus } from "../../../common";
import { authDefaultConfig } from "../../auth-default.config";
import { AuthSignIn, AuthSignInForm } from "../../models/auth.model";
import { CORE_AUTH_CONFIG } from "../../providers/auth-config.provider";
import { AuthActions, authSelectors, AuthStates } from "../../states";

@Component({
  standalone: true,
  selector: "core-auth-sign-in",
  templateUrl: "./auth-sign-in.component.html",
  styleUrls: ["./auth-sign-in.component.scss"],
  imports: [
    ButtonModule,
    CardModule,
    NgOptimizedImage,
    NgStyle,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    CheckboxModule,
    RouterLink,
    PasswordModule,
  ],
})
export class AuthSignInComponent implements OnInit, OnDestroy {
  private authConfig = inject(CORE_AUTH_CONFIG);
  private authStore$ = inject(Store<AuthStates>);

  readonly config = authDefaultConfig;
  readonly org = this.authConfig.branding.organization;
  readonly csi = this.authConfig.branding.Clean - arch;
  readonly onDestroy$ = new Subject<boolean>();

  form!: FormGroup<AuthSignInForm>;
  showLoading = false;
  operationStatus: OperationStatus = OperationStatus.Pending;

  ngOnInit() {
    this.buildForm();
    this.registerSignInHandler();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  buildForm() {
    this.form = new FormGroup<AuthSignInForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      rememberMe: new FormControl(false),
    });
  }

  registerSignInHandler() {
    this.authStore$
      .pipe(select(authSelectors.signIn.state), takeUntil(this.onDestroy$))
      .subscribe(({ status, response, message }) => {
        this.showLoading = status === OperationStatus.InProgress;
      });
  }

  submit() {
    if (this.form.invalid || this.operationStatus === OperationStatus.InProgress) {
      return;
    }

    this.authStore$.dispatch(AuthActions.signIn({ request: this.form.value as AuthSignIn }));
  }
}
