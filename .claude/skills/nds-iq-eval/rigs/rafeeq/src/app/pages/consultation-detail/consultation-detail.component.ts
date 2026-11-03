import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { ApiService } from '../../data/api.service';
import { ConsultationsService } from '../../data/consultations.service';
import { LanguageService } from '../../i18n/language.service';

const COMMENT_MAX = 1000;
const FILE_MAX_BYTES = 5 * 1024 * 1024;

const atLeastOne: ValidatorFn = (control) =>
  (control as FormArray<FormControl<boolean>>).controls.some((c) => c.value) ? null : { atLeastOne: true };

@Component({
  selector: 'app-consultation-detail',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSliderModule,
  ],
  templateUrl: './consultation-detail.component.html',
  styleUrl: './consultation-detail.component.scss',
})
export class ConsultationDetailComponent {
  readonly id = input.required<string>();

  private readonly consultations = inject(ConsultationsService);
  private readonly api = inject(ApiService);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;
  protected readonly l = this.lang.code;

  protected readonly commentMax = COMMENT_MAX;
  protected readonly Math = Math;

  // undefined = loading, null = no such consultation
  protected readonly consultation = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.consultations.byId(id).pipe(startWith(undefined)))),
  );

  protected readonly form = new FormGroup({
    choice: new FormControl<number | null>(null, { validators: [Validators.required] }),
    priorities: new FormArray<FormControl<boolean>>([], { validators: [atLeastOne] }),
    rating: new FormControl(3, { nonNullable: true }),
    comment: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(COMMENT_MAX)] }),
  });

  protected readonly commentLength = toSignal(
    this.form.controls.comment.valueChanges.pipe(map((v) => v.length)),
    { initialValue: 0 },
  );

  protected readonly file = signal<File | null>(null);
  protected readonly fileError = signal(false);
  protected readonly attempted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly receipt = signal<string | null>(null);

  protected readonly showResults = computed(() => {
    const c = this.consultation();
    return !!c && (c.status === 'closed' || this.receipt() !== null);
  });

  constructor() {
    // rebuild the checkbox group whenever another consultation loads
    effect(() => {
      const c = this.consultation();
      untracked(() => {
        this.form.reset({ choice: null, rating: 3, comment: '' });
        this.form.controls.priorities.clear();
        c?.survey.priorities.options.forEach(() =>
          this.form.controls.priorities.push(new FormControl(false, { nonNullable: true })),
        );
        this.file.set(null);
        this.fileError.set(false);
        this.attempted.set(false);
        this.receipt.set(null);
      });
    });
  }

  protected invalid(name: 'choice' | 'priorities' | 'comment'): boolean {
    return this.attempted() && this.form.controls[name].invalid;
  }

  protected onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const picked = input.files?.item(0) ?? null;
    if (picked && picked.size > FILE_MAX_BYTES) {
      this.fileError.set(true);
      this.file.set(null);
      input.value = '';
      return;
    }
    this.fileError.set(false);
    this.file.set(picked);
  }

  protected clearFile(input: HTMLInputElement): void {
    input.value = '';
    this.file.set(null);
    this.fileError.set(false);
  }

  protected submit(): void {
    const c = this.consultation();
    if (!c) return;
    this.attempted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const v = this.form.getRawValue();
    this.submitting.set(true);
    this.api
      .submitSurvey(c.id, {
        choice: c.survey.choice.options[v.choice ?? 0].en,
        priorities: c.survey.priorities.options.filter((_, i) => v.priorities[i]).map((o) => o.en),
        rating: v.rating,
        comment: v.comment,
        fileName: this.file()?.name ?? null,
      })
      .subscribe({
        next: ({ receipt }) => {
          this.submitting.set(false);
          this.receipt.set(receipt);
        },
        error: () => {
          this.submitting.set(false);
          this.snackBar.open(this.t().consultation.serverError, this.t().common.close, {
            panelClass: 'snack-error',
            duration: 6000,
          });
        },
      });
  }
}
