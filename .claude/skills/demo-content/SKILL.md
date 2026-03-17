---
name: demo-content
description: Create, refine, or fix reusable demo content YAML files in _data/content/. Use this skill whenever component documentation needs realistic demo text, icons need verification or fixing, new content types are needed for component demos, or existing content files need auditing. Also triggers when someone mentions broken icons in content files, wants to add demo data for a component, or needs polished English content for the NDS showcase.
argument-hint: "[file-name or 'all' to audit existing files]"
---

# Demo Content Management

Apply this skill to: `$ARGUMENTS`

**Single file** (e.g., `services`): create or refine `_data/content/$0.yml`.
**Audit mode** (`all`): check and fix every file in `_data/content/`.

## Scope

This skill manages **`_data/content/` YAML files only** — reusable demo data consumed by component documentation pages. For page-level content (homepage copy, promotional text, example page prose), use `/content-review` instead. For building or refining the doc pages that consume this data, use `/doc-page`.

## Why This Matters

Component documentation pages pull demo content from `_data/content/` YAML files. When this content has broken icons, placeholder text, or inconsistent structure, every demo that references it looks broken or unprofessional. These files are the single source of truth for demo content across the entire design system — getting them right means every component page automatically looks polished.

## Before You Touch Anything

1. **Read the target file** (`_data/content/$0.yml`) if it exists — understand what's there before changing it
2. **Read `_data/content/services.yml`** as the reference structure if creating a new file
3. **Grep `_sass/_hgiRoundedStroke.scss`** for icon keywords relevant to the content type — this is where you'll verify and discover icons
4. **Check which pages use this content** — grep for the filename across `components/` and `_includes/` so you don't break existing references

## Icon Verification

Broken icons are the most common problem in content files. The HGI icon font changes over time, and class names that worked before may stop rendering. Every icon in a content file must exist in `_sass/_hgiRoundedStroke.scss` — there are no exceptions.

For each icon class in the file:
1. Grep for the exact class name (e.g., `hgi-passport`) in `_sass/_hgiRoundedStroke.scss`
2. If it doesn't exist, search for alternatives using related keywords (e.g., `passport` → try `travel`, `document`, `visa`)
3. Pick the most contextually fitting alternative — a health service deserves a health-related icon, not a generic file icon

Icon HTML format: `<i class="hgi hgi-stroke hgi-{name} icon"></i>`

## Content Quality

All content is **English** and **entirely fictional**. Names, organizations, quotes, and testimonials must be made up — never use real people, real officials, or real government figures. It should read like a real Saudi government digital services platform — professional, clear, and specific — but every person, quote, and story is fabricated for demo purposes. The reason placeholder text like "Lorem ipsum" or "Sample item" is not acceptable is that these content files feed directly into live documentation demos. Developers copying demo code will see this text, and it sets the quality bar for the entire design system.

Each entry needs at minimum:
- `title` — short, specific label (not generic)
- `description` — one sentence that tells you what the service/item actually does
- `icon` — verified icon HTML (see above)

Additional fields vary by content type (`url`, `system`, `status`, `date`, `category`, `most_used`, etc.). Match fields to what the component demos actually need.

## Content Categories

Content files fall into two groups. Pick from this list when creating new files — it covers what the 33 existing components actually need.

### Government Platform Content
These simulate what developers build with the design system — a Saudi government digital services platform.

| File | Purpose | Key Fields | Used By |
|------|---------|------------|---------|
| `services.yml` | Government service catalog | title, description, icon, url, system, most_used | Cards, Accordion, Filter |
| `users.yml` | Employee/citizen profiles | name, email, role, department, avatar, status | Tables, Filter, Cards, Avatar |
| `notifications.yml` | System alerts and messages | title, message, type (success/warning/error/info), icon, timestamp | Alert, Dropmenu, Modal |
| `transactions.yml` | Data records and activity logs | id, name, amount, status, date, category | Tables, Pagination |
| `locations.yml` | Saudi cities and facilities | name, region, icon, coordinates | Filter, Tags, Chips |
| `steps.yml` | Multi-step process flows | step_number, title, description | Stepper |
| `news.yml` | News articles and press releases | title, summary, date, icon, category, url | Cards, Swiper, Accordion |
| `announcements.yml` | Official announcements and updates | title, message, type (info/urgent/update), icon, date | Alert, Cards, Modal |
| `events.yml` | Public events and conferences | title, description, date, time, location, icon, url | Cards, Tabs, Filter |
| `applications.yml` | Permit/license/visa applications | id, title, applicant, status (submitted/under-review/approved/rejected), date, icon | Tables, Stepper, Tags, Cards |
| `registrations.yml` | Enrollment and registration records | id, title, registrant, type (course/program/exam/membership), date, status, icon | Tables, Cards, Filter |
| `testimonials.yml` | User feedback and success stories | name, role, organization, quote, avatar, rating | Cards, Swiper, Rating |
| `quotes.yml` | Quotes from leaders and officials | name, title, organization, quote, avatar | Cards, Swiper, Modal |

### Design System Content
These serve the NDS documentation itself — component descriptions, navigation, and reference text.

| File | Purpose | Key Fields | Used By |
|------|---------|------------|---------|
| `menu-items.yml` | Navigation labels and actions | label, icon, url, type (link/action/divider), destructive | Dropmenu, Drawer, Tabs |
| `form-fields.yml` | Input labels, placeholders, validation | label, placeholder, type, error_message, help_text | Forms, Modal, Filter |
| `tags-categories.yml` | Classification labels | label, variant (department/role/status/priority), color | Tags, Chips, Filter, Tables |
| `metadata.yml` | Profile/detail key-value pairs | term, detail, icon | Definition List |
| `breadcrumbs.yml` | Navigation path examples | label, url, depth | Breadcrumb |

## Creating New Content Files

When creating a file from the list above (or a new type not listed):

1. **Include 8–20 entries** — enough for list, table, and grid demos without being excessive
2. **Vary the data realistically** — mix statuses, dates, categories, and icon types so demos look like real applications, not test data
3. **Use Saudi-appropriate names and context** — names like Ahmed, Fatima, Khalid; gov.sa email domains; SAR currency; Saudi cities
4. **Verify every icon** before saving — grep each class name against `_hgiRoundedStroke.scss`

## JSON Data Files

Some components (autocomplete, AJAX-loaded lists) need content served as static JSON rather than through Jekyll templates. There are two approaches:

### Auto-generate from YAML (preferred)
Create a Jekyll file in `assets/data/` with front matter that outputs JSON from `_data/content/`. This keeps YAML as the single source of truth — changes to the YAML automatically update the JSON endpoint.

```
---
---
{{ site.data.content.services | jsonify }}
```

**Name files by purpose, not source**: `{source}-{usage}.json` (e.g., `services-autocomplete.json`, `users-table.json`, `notifications-dropmenu.json`). The same YAML can generate multiple JSON files with different field subsets for different components.

### Standalone JSON
When the content is unique to a JS component and doesn't overlap with YAML content (e.g., `autocomplete-demo.json` with bilingual Arabic/English pairs), create a standalone JSON file in `assets/data/`. Follow the same naming convention: `{subject}-{usage}.json`. Follow the same content quality rules — no placeholder text, fictional data only, English content (add Arabic pairs when the component needs bilingual support).

## Auditing (when argument is `all`)

1. List all files in `_data/content/`
2. For each file, grep every icon class against `_sass/_hgiRoundedStroke.scss`
3. Report which icons are broken and what you replaced them with
4. Flag any placeholder-quality content and improve it
5. Check for structural consistency within each file (same fields across entries)

## Related Skills

- `/doc-page` — creates and refines the component documentation pages that consume this content
- `/content-review` — audits page-level content quality and writes promotional copy
