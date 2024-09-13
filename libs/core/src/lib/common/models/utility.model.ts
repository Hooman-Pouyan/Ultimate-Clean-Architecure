import { FormControl } from '@angular/forms';

export type RequiredKeys<T> = {
  [K in keyof T as (undefined extends T[K] ? never : K)]: T[K]
}

export type OptionalKeys<T> = {
  [K in keyof T as (undefined extends T[K] ? K : never)]: T[K]
}

export type TypedForm<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
}

