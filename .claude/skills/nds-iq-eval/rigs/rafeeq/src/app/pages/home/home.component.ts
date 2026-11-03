import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterLink } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { ConsultationsService } from '../../data/consultations.service';
import { JourneysService } from '../../data/journeys.service';
import { ServiceCatalogService } from '../../data/services.service';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly journeysApi = inject(JourneysService);
  private readonly catalog = inject(ServiceCatalogService);
  private readonly consultationsApi = inject(ConsultationsService);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;

  protected readonly query = new FormControl('', { nonNullable: true });

  protected readonly data = toSignal(
    forkJoin({
      journeys: this.journeysApi.list(),
      services: this.catalog.list(),
      consultations: this.consultationsApi.list(),
    }).pipe(
      map(({ journeys, services, consultations }) => ({
        featured: journeys.filter((j) => j.featured).slice(0, 4),
        popular: services.filter((s) => s.popular).slice(0, 6),
        consultation: consultations.find((c) => c.status === 'open') ?? null,
      })),
    ),
  );

  protected search(event: Event): void {
    event.preventDefault();
    const q = this.query.value.trim();
    this.router.navigate(['/help'], { queryParams: q ? { q } : {} });
  }
}
