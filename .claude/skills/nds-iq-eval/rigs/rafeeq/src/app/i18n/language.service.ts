import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import type { Direction } from '@angular/cdk/bidi';
import { ar, Dictionary } from './ar';
import { en } from './en';
import type { Lang } from '../data/models';

const STORAGE_KEY = 'rafeeq.lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly doc = inject(DOCUMENT);

  readonly code = signal<Lang>(this.readSaved());
  readonly dir = computed<Direction>(() => (this.code() === 'ar' ? 'rtl' : 'ltr'));
  readonly t = computed<Dictionary>(() => (this.code() === 'ar' ? ar : en));

  constructor() {
    this.applyToDocument(this.code());
  }

  toggle(): void {
    this.set(this.code() === 'ar' ? 'en' : 'ar');
  }

  set(lang: Lang): void {
    this.code.set(lang);
    this.applyToDocument(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // private mode, nothing to do
    }
  }

  /** Fee text: "Free" for zero, otherwise the amount in riyals. */
  fee(amount: number): string {
    const t = this.t().common;
    return amount === 0 ? t.free : t.sar(amount);
  }

  /** Gregorian date in the active language, Latin digits in both. */
  date(value: Date | string): string {
    const d = typeof value === 'string' ? new Date(value) : value;
    const locale = this.code() === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB';
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  }

  private readSaved(): Lang {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  }

  private applyToDocument(lang: Lang): void {
    const root = this.doc.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
