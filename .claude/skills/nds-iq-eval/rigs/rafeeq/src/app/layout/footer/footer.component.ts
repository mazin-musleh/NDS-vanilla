import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly lang = inject(LanguageService);
  protected readonly t = this.lang.t;

  protected readonly year = new Date().getFullYear();
  protected readonly lastUpdated = new Date(2026, 9, 18);
}
