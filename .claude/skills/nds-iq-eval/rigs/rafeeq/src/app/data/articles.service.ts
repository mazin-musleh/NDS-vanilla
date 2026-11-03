import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HelpData } from './models';
import { lag } from './net';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private readonly http = inject(HttpClient);

  private readonly data$ = this.http.get<HelpData>('data/articles.json').pipe(lag(), shareReplay(1));

  load(): Observable<HelpData> {
    return this.data$;
  }
}
