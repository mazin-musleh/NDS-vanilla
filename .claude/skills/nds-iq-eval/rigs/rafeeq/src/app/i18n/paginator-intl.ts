import { Injectable, effect, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LanguageService } from './language.service';

/** Paginator labels follow the active language. */
@Injectable()
export class LocalizedPaginatorIntl extends MatPaginatorIntl {
  private readonly lang = inject(LanguageService);

  constructor() {
    super();
    effect(() => {
      const p = this.lang.t().paginator;
      this.itemsPerPageLabel = p.itemsPerPage;
      this.nextPageLabel = p.next;
      this.previousPageLabel = p.previous;
      this.firstPageLabel = p.first;
      this.lastPageLabel = p.last;
      this.getRangeLabel = p.range;
      this.changes.next();
    });
  }
}
