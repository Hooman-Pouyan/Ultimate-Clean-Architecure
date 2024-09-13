import { NgClass, NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { SharedModule } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PaginatorModule } from "primeng/paginator";
import { PasswordModule } from "primeng/password";
import { Subject, takeUntil } from "rxjs";
import { OperationStatus } from "../../../common";
import { authDefaultConfig } from "../../auth-default.config";
import { AuthSignIn, AuthSignUpForm } from "../../models/auth.model";
import { CORE_AUTH_CONFIG } from "../../providers/auth-config.provider";
import { AuthActions, authSelectors, AuthStates } from "../../states";

@Component({
  standalone: true,
  selector: "core-auth-sign-up",
  templateUrl: "./auth-sign-up.component.html",
  imports: [
    ButtonModule,
    CardModule,
    CheckboxModule,
    InputTextModule,
    NgOptimizedImage,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
    NgStyle,
    PasswordModule,
    NgClass,
  ],
  styleUrls: ["./auth-sign-up.component.scss"],
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
  private authConfig = inject(CORE_AUTH_CONFIG);
  private authStore$ = inject(Store<AuthStates>);

  readonly config = authDefaultConfig;
  readonly org = this.authConfig.branding.organization;
  readonly csi = this.authConfig.branding.Clean - arch;
  readonly onDestroy$ = new Subject<boolean>();

  form!: FormGroup<AuthSignUpForm>;
  showLoading = false;
  operationStatus: OperationStatus = OperationStatus.Pending;

  ngOnInit() {
    this.buildForm();
    this.registerSignUpHandler();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  buildForm() {
    this.form = new FormGroup<AuthSignUpForm>(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: [
          (control: AbstractControl): ValidationErrors | null => {
            return control.value.password === control.value.confirmPassword
              ? null
              : { passwordsDoNotMatch: true };
          },
        ],
      }
    );
  }

  registerSignUpHandler() {
    this.authStore$
      .pipe(select(authSelectors.signUp.state), takeUntil(this.onDestroy$))
      .subscribe(({ status, request, message }) => {
        this.showLoading = status === OperationStatus.InProgress;
      });
  }

  submit() {
    if (this.form.invalid || this.operationStatus === OperationStatus.InProgress) {
      return;
    }

    this.authStore$.dispatch(
      AuthActions.signUp({
        request: { ...this.form.value, confirmPassword: undefined } as AuthSignIn,
      })
    );
  }
}
