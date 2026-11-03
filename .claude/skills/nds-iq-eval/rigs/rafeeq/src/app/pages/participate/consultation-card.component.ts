import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Consultation } from '../../data/models';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-consultation-card',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card appearance="outlined" class="consultation-card">
      <mat-card-header>
        <mat-card-subtitle>{{ t().topic[item().topic] }}</mat-card-subtitle>
        <mat-card-title class="title">{{ item().title[l()] }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="summary">{{ item().summary[l()] }}</p>
        <p class="meta" [class.closed]="item().status === 'closed'">
          <mat-icon>{{ item().status === 'open' ? 'schedule' : 'event_busy' }}</mat-icon>
          {{ item().status === 'open' ? t().participate.endsIn(item().days) : t().participate.endedAgo(item().days) }}
        </p>
        <p class="meta muted">
          <mat-icon>groups</mat-icon>
          {{ t().participate.participants(item().participants) }}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <a mat-flat-button [routerLink]="['/participate', item().id]">
          {{ item().status === 'open' ? t().participate.join : t().participate.results }}
        </a>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    :host {
      display: block;
    }

    .consultation-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.18s ease;

      &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
      }

      mat-card-content {
        flex: 1;
      }

      mat-card-actions {
        padding: 8px 16px 16px;
      }
    }

    .title {
      font-size: 18px;
      line-height: 1.5;
    }

    .summary {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: var(--rf-muted);
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 4px;
      font-weight: 600;
      color: #b45309;

      &.closed {
        color: var(--rf-muted);
      }

      &.muted {
        font-weight: 400;
      }
    }
  `,
})
export class ConsultationCardComponent {
  readonly item = input.required<Consultation>();

  private readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;
}
