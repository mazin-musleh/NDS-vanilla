import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { Dictionary } from './i18n/ar';
import { LanguageService } from './i18n/language.service';

/** Browser tab title, resolved when the route activates. */
const pageTitle =
  (pick: (t: Dictionary) => string): ResolveFn<string> =>
  () => {
    const lang = inject(LanguageService);
    return `${pick(lang.t())} | ${lang.code() === 'ar' ? 'رفيق' : 'Rafeeq'}`;
  };

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: pageTitle((t) => t.nav.home),
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'journeys',
    title: pageTitle((t) => t.nav.journeys),
    loadComponent: () => import('./pages/journeys/journeys.component').then((m) => m.JourneysComponent),
  },
  {
    path: 'journeys/:slug',
    title: pageTitle((t) => t.nav.journeys),
    loadComponent: () =>
      import('./pages/journey-detail/journey-detail.component').then((m) => m.JourneyDetailComponent),
  },
  {
    path: 'services/:id',
    title: pageTitle((t) => t.service.tabs.overview),
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then((m) => m.ServiceDetailComponent),
  },
  {
    path: 'participate',
    title: pageTitle((t) => t.nav.participate),
    loadComponent: () => import('./pages/participate/participate.component').then((m) => m.ParticipateComponent),
  },
  {
    path: 'participate/:id',
    title: pageTitle((t) => t.nav.participate),
    loadComponent: () =>
      import('./pages/consultation-detail/consultation-detail.component').then((m) => m.ConsultationDetailComponent),
  },
  {
    path: 'help',
    title: pageTitle((t) => t.nav.help),
    loadComponent: () => import('./pages/help/help.component').then((m) => m.HelpComponent),
  },
  {
    path: 'help/articles/:id',
    title: pageTitle((t) => t.nav.help),
    loadComponent: () => import('./pages/article/article.component').then((m) => m.ArticleComponent),
  },
  {
    path: 'help/ticket',
    title: pageTitle((t) => t.ticket.title),
    loadComponent: () => import('./pages/ticket/ticket.component').then((m) => m.TicketComponent),
  },
  {
    path: '**',
    title: pageTitle((t) => t.notFound.title),
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
