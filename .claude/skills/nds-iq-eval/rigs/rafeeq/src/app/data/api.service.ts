import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SurveyAnswers, TicketPayload } from './models';
import { failAfterLag, lag } from './net';

/**
 * Write endpoints. The back end is not wired up in this environment yet,
 * so every call resolves (or fails) after a short delay.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  rateService(serviceId: string, stars: number): Observable<{ serviceId: string; stars: number }> {
    return of({ serviceId, stars }).pipe(lag());
  }

  sendArticleFeedback(articleId: string, helpful: boolean): Observable<{ articleId: string; helpful: boolean }> {
    return of({ articleId, helpful }).pipe(lag());
  }

  submitSurvey(consultationId: string, answers: SurveyAnswers): Observable<{ receipt: string }> {
    if (consultationId === 'C-104') {
      return failAfterLag(503, 'Service Unavailable', `/api/consultations/${consultationId}/responses`);
    }
    const receipt = `R-${consultationId.replace('C-', '')}-${Math.floor(10000 + Math.random() * 89999)}`;
    void answers;
    return of({ receipt }).pipe(lag());
  }

  createTicket(payload: TicketPayload): Observable<{ reference: string }> {
    if (payload.email.toLowerCase().endsWith('@fail.test')) {
      return failAfterLag(500, 'Internal Server Error', '/api/tickets');
    }
    const serial = String(Math.floor(1000 + Math.random() * 8999)).padStart(6, '0');
    return of({ reference: `T-${new Date().getFullYear()}-${serial}` }).pipe(lag());
  }
}
