import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../data/api.service';
import { ArticlesService } from '../../data/articles.service';
import { TicketPayload } from '../../data/models';
import { LanguageService } from '../../i18n/language.service';

const MAX_FILES = 3;
const MAX_BYTES = 5 * 1024 * 1024;

type Field = 'category' | 'subject' | 'description' | 'nationalId' | 'mobile' | 'email';

@Component({
  selector: 'app-ticket',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  private readonly api = inject(ApiService);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;

  protected readonly categories = toSignal(inject(ArticlesService).load());
  protected readonly methods = ['phone', 'email', 'sms'] as const;

  protected readonly form = new FormGroup({
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    subject: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(120)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20), Validators.maxLength(2000)],
    }),
    nationalId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[12]\d{9}$/)],
    }),
    mobile: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^05\d{8}$/)],
    }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    contactMethod: new FormControl<'phone' | 'email' | 'sms'>('phone', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected readonly files = signal<File[]>([]);
  protected readonly fileError = signal<'size' | 'count' | null>(null);
  protected readonly submitting = signal(false);
  protected readonly reference = signal<string | null>(null);

  protected error(name: Field): string {
    const control = this.form.controls[name];
    const e = this.t().ticket.errors;
    if (control.hasError('required')) return e.required;
    if (control.hasError('minlength')) return e.minLength(control.errors?.['minlength'].requiredLength);
    if (control.hasError('maxlength')) return e.maxLength(control.errors?.['maxlength'].requiredLength);
    if (control.hasError('email')) return e.email;
    if (control.hasError('pattern')) return name === 'nationalId' ? e.idPattern : e.mobilePattern;
    return '';
  }

  protected addFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    const picked = Array.from(input.files ?? []);
    input.value = '';
    const next = [...this.files(), ...picked];
    if (next.length > MAX_FILES) {
      this.fileError.set('count');
      return;
    }
    if (next.some((f) => f.size > MAX_BYTES)) {
      this.fileError.set('size');
      return;
    }
    this.fileError.set(null);
    this.files.set(next);
  }

  protected removeFile(index: number): void {
    this.files.update((list) => list.filter((_, i) => i !== index));
    this.fileError.set(null);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: TicketPayload = {
      ...this.form.getRawValue(),
      attachments: this.files().map((f) => f.name),
    };
    this.submitting.set(true);
    this.api.createTicket(payload).subscribe({
      next: ({ reference }) => {
        this.submitting.set(false);
        this.reference.set(reference);
      },
      error: () => {
        this.submitting.set(false);
        this.snackBar.open(this.t().ticket.serverError, this.t().common.close, {
          panelClass: 'snack-error',
          duration: 6000,
        });
      },
    });
  }

  protected another(): void {
    this.form.reset();
    this.files.set([]);
    this.reference.set(null);
  }
}
