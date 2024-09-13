import { map, Observable } from 'rxjs';

export function convertDateStrings<T>(fields: string[]): (source$: Observable<T>) => Observable<T> {
  return (source$) => {
    return source$.pipe(map(payload => {
      if (!Object.keys(payload || {}).length) {
        return payload;
      }

      let result = structuredClone(payload || {}) as any;

      for (const field of fields) {
        field.split('.').map((k, i, values) => {
          result[k] = i === values.length - 1 ? new Date(result[k]) : { ...result[k] };
        });
      }

      return result as T;
    }));
  };
}