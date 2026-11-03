export type Lang = 'ar' | 'en';

export interface Localized {
  ar: string;
  en: string;
}

export type Audience = 'citizens' | 'residents' | 'businesses';
export type Channel = 'online' | 'app' | 'branch' | 'phone';
export type Topic = 'transport' | 'health' | 'education' | 'environment' | 'digital' | 'housing' | 'economy';

/* ---------- Journeys and services ---------- */

export interface JourneyStage {
  id: string;
  title: Localized;
  description: Localized;
  services: string[];
}

export interface Journey {
  slug: string;
  icon: string;
  featured: boolean;
  audience: Audience[];
  title: Localized;
  tagline: Localized;
  intro: Localized;
  documents: Localized[];
  stages: JourneyStage[];
}

export interface Fee {
  label: Localized;
  amountSar: number;
}

export interface Faq {
  q: Localized;
  a: Localized;
}

export interface GovService {
  id: string;
  name: Localized;
  provider: Localized;
  summary: Localized;
  audience: Audience[];
  channels: Channel[];
  duration: Localized;
  feeSar: number;
  eligibility: Localized;
  popular: boolean;
  platformUrl: string;
  requirements: Localized[];
  steps: Localized[];
  fees: Fee[];
  faqs: Faq[];
  related: string[];
}

/* ---------- Consultations ---------- */

export interface ConsultationDoc {
  name: Localized;
  type: string;
  sizeKb: number;
}

export interface ChoiceQuestion {
  q: Localized;
  options: Localized[];
}

export interface ConsultationRaw {
  id: string;
  topic: Topic;
  status: 'open' | 'closed';
  /** Days left (open) or days since closing (closed). */
  days: number;
  participants: number;
  entity: Localized;
  title: Localized;
  summary: Localized;
  documents: ConsultationDoc[];
  survey: {
    choice: ChoiceQuestion;
    priorities: ChoiceQuestion;
    rating: { q: Localized };
  };
  results: {
    choice: number[];
    priorities: number[];
    rating: number;
  };
}

export interface Consultation extends ConsultationRaw {
  /** Closing date for open items, closing date in the past for closed ones. */
  date: Date;
}

export interface SurveyAnswers {
  choice: string;
  priorities: string[];
  rating: number;
  comment: string;
  fileName: string | null;
}

/* ---------- Help center ---------- */

export interface HelpCategory {
  id: string;
  icon: string;
  name: Localized;
}

export interface Article {
  id: string;
  categoryId: string;
  title: Localized;
  summary: Localized;
  /** HTML migrated from the old CMS. */
  body: Localized;
  updated: string;
  related: string[];
}

export interface TopQuestion {
  q: Localized;
  a: Localized;
}

export interface HelpData {
  categories: HelpCategory[];
  articles: Article[];
  topQuestions: TopQuestion[];
}

export interface TicketPayload {
  category: string;
  subject: string;
  description: string;
  nationalId: string;
  mobile: string;
  email: string;
  contactMethod: 'phone' | 'email' | 'sms';
  attachments: string[];
}
