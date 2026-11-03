import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { forkJoin, map, startWith, switchMap } from 'rxjs';
import { JourneysService } from '../../data/journeys.service';
import { GovService, JourneyStage } from '../../data/models';
import { ServiceCatalogService } from '../../data/services.service';
import { LanguageService } from '../../i18n/language.service';

const storageKey = (slug: string) => `rafeeq.progress.${slug}`;

@Component({
  selector: 'app-journey-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatStepperModule,
  ],
  templateUrl: './journey-detail.component.html',
  styleUrl: './journey-detail.component.scss',
})
export class JourneyDetailComponent {
  readonly slug = input.required<string>();

  private readonly journeys = inject(JourneysService);
  private readonly catalog = inject(ServiceCatalogService);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;

  // undefined = loading, null = no such journey
  protected readonly view = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        forkJoin({ journey: this.journeys.bySlug(slug), services: this.catalog.list() }).pipe(
          map(({ journey, services }) =>
            journey ? { journey, byId: new Map(services.map((s) => [s.id, s] as const)) } : null,
          ),
          startWith(undefined),
        ),
      ),
    ),
  );

  protected readonly done = signal<string[]>([]);

  protected readonly doneCount = computed(() => {
    const v = this.view();
    return v ? v.journey.stages.filter((s) => this.done().includes(s.id)).length : 0;
  });

  protected readonly percent = computed(() => {
    const v = this.view();
    return v && v.journey.stages.length ? Math.round((this.doneCount() / v.journey.stages.length) * 100) : 0;
  });

  constructor() {
    effect(() => {
      this.done.set(this.readSaved(this.slug()));
    });
  }

  protected stageServices(stage: JourneyStage, byId: Map<string, GovService>): GovService[] {
    return stage.services.map((id) => byId.get(id)).filter((s): s is GovService => !!s);
  }

  protected isDone(stageId: string): boolean {
    return this.done().includes(stageId);
  }

  protected toggle(stageId: string, checked: boolean): void {
    this.done.update((list) => {
      const rest = list.filter((id) => id !== stageId);
      return checked ? [...rest, stageId] : rest;
    });
    this.save();
  }

  protected reset(): void {
    this.done.set([]);
    this.save();
  }

  private readSaved(slug: string): string[] {
    try {
      const raw = localStorage.getItem(storageKey(slug));
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(storageKey(this.slug()), JSON.stringify(this.done()));
    } catch {
      // storage unavailable, progress just won't persist
    }
  }
}
