import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Journey } from './models';
import { lag } from './net';

@Injectable({ providedIn: 'root' })
export class JourneysService {
  private readonly http = inject(HttpClient);

  private readonly all$ = this.http.get<Journey[]>('data/journeys.json').pipe(lag(), shareReplay(1));

  list(): Observable<Journey[]> {
    return this.all$;
  }

  bySlug(slug: string): Observable<Journey | null> {
    return this.all$.pipe(map((list) => list.find((j) => j.slug === slug) ?? null));
  }
}
