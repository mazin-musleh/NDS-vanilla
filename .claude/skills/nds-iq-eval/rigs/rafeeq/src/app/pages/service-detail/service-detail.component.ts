import { Component, effect, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { forkJoin, map, startWith, switchMap } from 'rxjs';
import { ApiService } from '../../data/api.service';
import { GovService } from '../../data/models';
import { ServiceCatalogService } from '../../data/services.service';
import { LanguageService } from '../../i18n/language.service';
import { StartServiceDialogComponent } from './start-service-dialog.component';

@Component({
  selector: 'app-service-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTabsModule,
  ],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss',
})
export class ServiceDetailComponent {
  readonly id = input.required<string>();

  private readonly catalog = inject(ServiceCatalogService);
  private readonly api = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;

  protected readonly stars = [1, 2, 3, 4, 5];
  protected readonly rating = signal(0);
  protected readonly hover = signal(0);
  protected readonly saving = signal(false);

  // undefined = loading, null = no such service
  protected readonly view = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        forkJoin({ service: this.catalog.byId(id), all: this.catalog.list() }).pipe(
          map(({ service, all }) =>
            service ? { service, related: all.filter((s) => service.related.includes(s.id)) } : null,
          ),
          startWith(undefined),
        ),
      ),
    ),
  );

  constructor() {
    effect(() => {
      this.id();
      this.rating.set(0);
    });
  }

  protected total(s: GovService): number {
    return s.fees.reduce((sum, f) => sum + f.amountSar, 0);
  }

  protected list(values: string[]): string {
    return values.join(this.lang.code() === 'ar' ? '، ' : ', ');
  }

  protected channelsText(s: GovService): string {
    return this.list(s.channels.map((c) => this.t().channel[c]));
  }

  protected audienceText(s: GovService): string {
    return this.list(s.audience.map((a) => this.t().audience[a]));
  }

  protected start(service: GovService): void {
    this.dialog.open(StartServiceDialogComponent, {
      data: { service },
      width: '460px',
      maxWidth: '92vw',
      direction: this.lang.dir(),
    });
  }

  protected rate(service: GovService, stars: number): void {
    if (this.saving()) return;
    this.saving.set(true);
    this.api.rateService(service.id, stars).subscribe({
      next: () => {
        this.rating.set(stars);
        this.saving.set(false);
        this.snackBar.open(this.t().service.rating.thanks, this.t().common.close);
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open(this.t().service.rating.failed, this.t().common.close, { panelClass: 'snack-error' });
      },
    });
  }
}
