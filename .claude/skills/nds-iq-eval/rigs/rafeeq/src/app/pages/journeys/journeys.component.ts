import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { JourneysService } from '../../data/journeys.service';
import { Audience } from '../../data/models';
import { LanguageService } from '../../i18n/language.service';

type AudienceFilter = Audience | 'all';

@Component({
  selector: 'app-journeys',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatProgressBarModule],
  templateUrl: './journeys.component.html',
  styleUrl: './journeys.component.scss',
})
export class JourneysComponent {
  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;

  protected readonly filters: AudienceFilter[] = ['all', 'citizens', 'residents', 'businesses'];
  protected readonly audience = signal<AudienceFilter>('all');

  private readonly journeys = toSignal(inject(JourneysService).list());

  protected readonly visible = computed(() => {
    const list = this.journeys();
    const a = this.audience();
    if (!list) return undefined;
    return a === 'all' ? list : list.filter((j) => j.audience.includes(a));
  });

  protected pick(value: AudienceFilter | undefined): void {
    // clicking the selected chip deselects it; treat that as "all"
    this.audience.set(value ?? 'all');
  }
}
