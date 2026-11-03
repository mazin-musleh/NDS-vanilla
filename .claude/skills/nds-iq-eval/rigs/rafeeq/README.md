# رفيق (Rafeeq)

Rafeeq is a citizen and resident portal that walks people through life events (a new baby, marriage, starting a business, retirement and more) and the government services each stage needs. It also hosts public consultations with surveys (e-participation) and a help center with articles and support tickets. The UI is Arabic (RTL) by default, with English available from the toolbar without a reload.

Built with Angular 22 (standalone components, signals, zoneless change detection) and Angular Material 22.

## Run it

```bash
npm install
npm start          # http://localhost:3009
npm run build      # production build into dist/
```

Node 22.22.3 or newer is required (Angular 22).

There is no back end. The JSON files in `public/data/` stand in for the API, and the write calls in `src/app/data/api.service.ts` resolve (or fail) after a short delay.

## Routes

| Route | What it is |
|---|---|
| `/` | Home: hero search, featured journeys, popular services, latest open consultation, help links |
| `/journeys` | The 8 life journeys, filtered by audience (citizens, residents, businesses) |
| `/journeys/:slug` | One journey: a stepper of stages, services per stage, progress saved in the browser, documents panel |
| `/services/:id` | One service: summary, tabs (overview, requirements, steps, fees, FAQs), start dialog, rating, related services |
| `/participate` | Public consultations, open and closed tabs, topic filter, 6 per page |
| `/participate/:id` | One consultation: summary, documents, survey form, results |
| `/help` | Help center: article search, categories, top questions, contact channels |
| `/help/articles/:id` | One help article with category navigation and a helpful yes/no |
| `/help/ticket` | Support ticket form with a reference number on success |
| `**` | Not found |

## Test data

- Consultation `C-104`: submitting the survey fails with a 503 after the delay (an error snack bar shows).
- Ticket form: an email ending in `@fail.test` makes the submit fail with a server error.
- Closed consultations (results only, no survey): `C-101`, `C-102`, `C-107`, `C-109`, `C-111`. The rest are open.
- Ticket ID rules: 10 digits starting with 1 or 2; mobile: `05` followed by 8 digits.

## Notes

- There is no sign-in. Journey progress and the chosen language are kept in `localStorage` on the device.
- Strings live in `src/app/i18n/ar.ts` and `en.ts`; records in `public/data/` carry `{ ar, en }` fields.
