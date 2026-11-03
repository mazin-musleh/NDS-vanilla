import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from '../../data/api.service';
import { ArticlesService } from '../../data/articles.service';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-article',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  readonly id = input.required<string>();

  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;

  protected readonly isPhone = toSignal(
    inject(BreakpointObserver)
      .observe(Breakpoints.XSmall)
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  protected readonly data = toSignal(inject(ArticlesService).load());

  // undefined = loading, null = no such article
  protected readonly article = computed(() => {
    const d = this.data();
    return d ? (d.articles.find((a) => a.id === this.id()) ?? null) : undefined;
  });

  protected readonly related = computed(() => {
    const d = this.data();
    const a = this.article();
    return d && a ? d.articles.filter((x) => a.related.includes(x.id)) : [];
  });

  protected readonly answered = signal(false);
  protected readonly sending = signal(false);

  constructor() {
    effect(() => {
      this.id();
      this.answered.set(false);
    });
  }

  protected goCategory(categoryId: string): void {
    const first = this.data()?.articles.find((a) => a.categoryId === categoryId);
    if (first) this.router.navigate(['/help/articles', first.id]);
  }

  protected firstArticle(categoryId: string): string {
    return this.data()?.articles.find((a) => a.categoryId === categoryId)?.id ?? '';
  }

  protected vote(articleId: string, helpful: boolean): void {
    if (this.sending()) return;
    this.sending.set(true);
    this.api.sendArticleFeedback(articleId, helpful).subscribe({
      next: () => {
        this.sending.set(false);
        this.answered.set(true);
      },
      error: () => {
        this.sending.set(false);
        this.snackBar.open(this.t().article.feedbackFailed, this.t().common.close, { panelClass: 'snack-error' });
      },
    });
  }
}
