import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GovService } from '../../data/models';
import { LanguageService } from '../../i18n/language.service';

export interface StartServiceDialogData {
  service: GovService;
}

@Component({
  selector: 'app-start-service-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon class="dialog-icon">open_in_new</mat-icon>
      {{ t().service.dialog.title }}
    </h2>
    <mat-dialog-content>
      <p>{{ t().service.dialog.body(data.service.provider[l()], host) }}</p>
      <p class="service-name">{{ data.service.name[l()] }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close type="button">{{ t().common.cancel }}</button>
      <a
        mat-flat-button
        [href]="data.service.platformUrl"
        target="_blank"
        rel="noopener noreferrer"
        [mat-dialog-close]="true"
      >
        {{ t().service.dialog.go }}
      </a>
    </mat-dialog-actions>
  `,
  styles: `
    .dialog-icon {
      vertical-align: middle;
      margin-inline-end: 8px;
      color: #00695c;
    }

    .service-name {
      font-weight: 600;
    }
  `,
})
export class StartServiceDialogComponent {
  protected readonly data = inject<StartServiceDialogData>(MAT_DIALOG_DATA);
  private readonly lang = inject(LanguageService);

  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;
  protected readonly host = new URL(this.data.service.platformUrl).hostname;
}
