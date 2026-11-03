import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Consultation, ConsultationRaw } from './models';
import { lag } from './net';

const DAY = 24 * 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class ConsultationsService {
  private readonly http = inject(HttpClient);

  // Deadlines are stored as "days from now" so the list never goes stale.
  private readonly all$ = this.http.get<ConsultationRaw[]>('data/consultations.json').pipe(
    lag(),
    map((rows) =>
      rows.map((c): Consultation => {
        const offset = c.status === 'open' ? c.days : -c.days;
        return { ...c, date: new Date(Date.now() + offset * DAY) };
      }),
    ),
    shareReplay(1),
  );

  list(): Observable<Consultation[]> {
    return this.all$;
  }

  byId(id: string): Observable<Consultation | null> {
    return this.all$.pipe(map((list) => list.find((c) => c.id === id) ?? null));
  }
}
