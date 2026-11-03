import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ConsultationsService } from '../../data/consultations.service';
import { Topic } from '../../data/models';
import { LanguageService } from '../../i18n/language.service';
import { ConsultationCardComponent } from './consultation-card.component';

type Status = 'open' | 'closed';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-participate',
  imports: [
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
    ConsultationCardComponent,
  ],
  templateUrl: './participate.component.html',
  styleUrl: './participate.component.scss',
})
export class ParticipateComponent {
  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;

  protected readonly pageSize = PAGE_SIZE;
  protected readonly statuses: Status[] = ['open', 'closed'];
  protected readonly topics: (Topic | 'all')[] = [
    'all',
    'transport',
    'health',
    'education',
    'environment',
    'digital',
    'housing',
    'economy',
  ];

  protected readonly topic = signal<Topic | 'all'>('all');
  protected readonly pageIndex = signal<Record<Status, number>>({ open: 0, closed: 0 });

  private readonly all = toSignal(inject(ConsultationsService).list());

  protected readonly filtered = computed(() => {
    const list = this.all();
    const topic = this.topic();
    return list ? list.filter((c) => topic === 'all' || c.topic === topic) : undefined;
  });

  protected items(status: Status) {
    return (this.filtered() ?? []).filter((c) => c.status === status);
  }

  protected paged(status: Status) {
    const start = this.pageIndex()[status] * PAGE_SIZE;
    return this.items(status).slice(start, start + PAGE_SIZE);
  }

  protected setTopic(value: Topic | 'all'): void {
    this.topic.set(value);
    this.pageIndex.set({ open: 0, closed: 0 });
  }

  protected onPage(status: Status, event: PageEvent): void {
    this.pageIndex.update((p) => ({ ...p, [status]: event.pageIndex }));
  }

  protected tabLabel(status: Status): string {
    const name = status === 'open' ? this.t().participate.tabOpen : this.t().participate.tabClosed;
    return `${name} (${this.items(status).length})`;
  }
}
