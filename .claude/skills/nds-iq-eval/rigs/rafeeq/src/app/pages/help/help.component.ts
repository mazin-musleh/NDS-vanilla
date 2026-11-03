import { Component, computed, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../../data/articles.service';
import { LanguageService } from '../../i18n/language.service';

const escapeHtml = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

@Component({
  selector: 'app-help',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})
export class HelpComponent {
  /** Pre-filled from `?q=` by the home page search. */
  readonly q = input<string>();

  private readonly router = inject(Router);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;

  protected readonly data = toSignal(inject(ArticlesService).load());

  protected readonly search = new FormControl('', { nonNullable: true });
  protected readonly term = toSignal(this.search.valueChanges, { initialValue: '' });

  protected readonly matches = computed(() => {
    const d = this.data();
    const term = this.term().trim().toLowerCase();
    if (!d || !term) return [];
    const l = this.l();
    return d.articles
      .filter((a) => a.title[l].toLowerCase().includes(term) || a.summary[l].toLowerCase().includes(term))
      .slice(0, 6);
  });

  constructor() {
    effect(() => {
      const q = this.q();
      if (q) this.search.setValue(q);
    });
  }

  /** Shows the article title in the input once an option is picked. */
  protected readonly titleOf = (value: string): string => {
    const article = this.data()?.articles.find((a) => a.id === value);
    return article ? article.title[this.l()] : value;
  };

  protected highlight(title: string): string {
    const term = this.term().trim();
    const at = term ? title.toLowerCase().indexOf(term.toLowerCase()) : -1;
    if (at < 0) return escapeHtml(title);
    return (
      escapeHtml(title.slice(0, at)) +
      '<mark>' +
      escapeHtml(title.slice(at, at + term.length)) +
      '</mark>' +
      escapeHtml(title.slice(at + term.length))
    );
  }

  protected open(event: MatAutocompleteSelectedEvent): void {
    this.router.navigate(['/help/articles', event.option.value]);
  }

  protected articleCount(categoryId: string): number {
    return this.data()?.articles.filter((a) => a.categoryId === categoryId).length ?? 0;
  }

  protected firstArticle(categoryId: string): string {
    return this.data()?.articles.find((a) => a.categoryId === categoryId)?.id ?? '';
  }
}
