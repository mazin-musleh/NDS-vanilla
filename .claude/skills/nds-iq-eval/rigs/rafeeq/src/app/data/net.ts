import { HttpErrorResponse } from '@angular/common/http';
import { MonoTypeOperatorFunction, Observable, delay, switchMap, throwError, timer } from 'rxjs';

/** Simulated round-trip time, 300-600 ms. */
export const lag = <T>(): MonoTypeOperatorFunction<T> => delay<T>(300 + Math.floor(Math.random() * 300));

/** An HTTP error that arrives after the usual round trip. */
export function failAfterLag(status: number, statusText: string, url: string): Observable<never> {
  return timer(300 + Math.floor(Math.random() * 300)).pipe(
    switchMap(() => throwError(() => new HttpErrorResponse({ status, statusText, url }))),
  );
}
