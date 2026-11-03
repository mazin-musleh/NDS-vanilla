import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { GovService } from './models';
import { lag } from './net';

@Injectable({ providedIn: 'root' })
export class ServiceCatalogService {
  private readonly http = inject(HttpClient);

  private readonly all$ = this.http.get<GovService[]>('data/services.json').pipe(lag(), shareReplay(1));

  list(): Observable<GovService[]> {
    return this.all$;
  }

  byId(id: string): Observable<GovService | null> {
    return this.all$.pipe(map((list) => list.find((s) => s.id === id) ?? null));
  }
}
