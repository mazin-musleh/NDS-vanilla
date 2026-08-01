# NDS WordPress — CMS Architecture & Scalability Proposal

**Scope:** A strategy for building and operating the complete NDS WordPress site as a sustainable CMS: strict adherence to the original repository's standards, a full-control permission/approval system, and continuous multi-source content contribution with zero-downtime, high-availability operations.

---

## 1. Adherence to original repository standards (the contract)

The CMS does not weaken the design system; it enforces it. Every mechanism below is derived from the audited Jekyll source and the migration guide.

### 1.1 Standards enforced at the content layer

| Original standard | CMS enforcement |
|---|---|
| **Markup contract** (class names, `data-*`, ARIA) | Content is authored **only** through blocks/patterns that emit canonical markup. Raw-HTML entry is restricted to trusted roles; a "markup linter" on save validates blocked attributes (`on*`, `javascript:`), disallowed tags, and required ARIA pairs (per the JSS security rules of the source audit) |
| **Token discipline** | Editors pick colors from `theme.json` palettes only (no custom color field for roles without design mandate); block styles enforce the fixed status palette; re-branding is a variation, not a content decision |
| **i18n (ar default, RTL)** | Every CPT registers `ar`/`en` fields (or uses a bilingual plugin convention); direction is locale-driven; strings flow through translation files |
| **Performance parity** | Content constraints: hero images ≤2 per slide set, webp/avif with explicit dimensions, alt text required; video embeds are lazy and never autoplay; galleries paginate (6/9/12 per page) |
| **Accessibility as data** | Required fields: `alt` on every meaningful image, descriptive link text, captions on media; a pre-publish a11y checklist is part of the approval workflow |
| **Versioning metadata** (`since`/`updated`/`last_edit`) | Auto-managed post meta: `_nds_since` (set once), `_nds_updated` (bumped on any content change), `_nds_last_edit` (timestamp, GMT+3) — mirroring the source's doc discipline |

### 1.2 Standards enforced at the code layer

- Block/pattern/part code passes the audit catalogs (CSS: SEL/DEAD/DUPE/PERF/TOK; JS: JSP/JSD/JSS/JSA) before merge, as continuous-integration jobs (lint + build + perf smoke), not just human review.
- The lifecycle canon, token rules, and RTL-first policy from the blueprint (§2) are encoded as CI rules and code-review checklists.
- Event packs and style variations are the only sanctioned re-theming path; ad-hoc color overrides are rejected at review.

---

## 2. Permission management system (full-control admin & audit)

### 2.1 Role model (mapped to WP capabilities, extended for approval)

| Role | Capabilities | Notes |
|---|---|---|
| **Viewer** | read | Public/authenticated read |
| **Contributor (content author)** | `edit_nds_*` (drafts), upload files | Cannot publish; submits for review |
| **Editor (reviewer/approver)** | `edit_published_nds_*`, `publish_nds_*`, `delete_nds_*`, moderation rights | Approves/rejects drafts; edits published content; cannot change roles or settings |
| **Section supervisor** | Editor + scoped capabilities per content type/section | Approval for their section only (via a capability-mapped section taxonomy) |
| **Design-system steward** | All content + block/pattern/style variation management | Guards markup/token discipline; owns the pattern library |
| **Administrator** | Everything + user/role management | Minimum 2 admins; no day-to-day content duties |
| **Auditor (read-only)** | `read` + audit-log access | Compliance/audit trail only |

### 2.2 Approval workflow (content lifecycle)

1. **Draft** — author creates/edits; every change recorded (who, when, what fields, diff).
2. **Submit for review** — status → `pending`; editor(s) of the owning section notified.
3. **Review** — editor sees a rendered preview + a diff view (field-level) + the a11y/i18n checklist status; approves, requests changes (with comments attached to fields), or rejects.
4. **Scheduled publish** — approved items enter a publication queue; release time configurable (Riyadh tz).
5. **Published** — live; post-publication edits by non-stewards return to `pending` (re-approval) unless the editor holds an explicit "fast-track" capability.
6. **Audit** — every transition logged (audit post type or table): actor, action, timestamp, before/after, approval chain. Retention policy configurable (e.g., 2 years).

### 2.3 Technical mechanisms

- **Custom post statuses:** `pending_review`, `scheduled`, `approved` alongside core `draft`/`pending`/`publish`; workflows enforced by `wp_insert_post_data` + transition hooks.
- **Capability mapping:** `map_meta_cap` filters per CPT; section scoping via a `nds_section` taxonomy where a supervisor's caps are granted per-term (custom `user_has_cap` logic).
- **Admin dashboard:** an "Approval Center" admin page (list table of pending items with preview/diff/approve/reject actions), plus dashboard widgets (pending count, queue, recent audits). All UI follows NDS design tokens.
- **REST endpoints** (`nds/v1/workflow/*`) power the editor UI and headless clients; every route checks nonce + capability + audit-log write.
- **Preview isolation:** reviewers preview in a sandboxed render (front-end preview with unapproved revisions), never the live page.
- **Locking:** content-lock on edit (core's post locking) to prevent concurrent overwrites; merge notes when an approver edits after an author.

### 2.4 Audit & compliance

- Immutable-ish audit log (append-only custom table; writes via a single service class; no UI edit).
- Exportable reports (CSV/PDF via the Export patterns) for compliance officers.
- Retention and GDPR-style export/deletion flows for personal data (personas, feedback).

---

## 3. Continuous content contribution without conflicts (zero-downtime, high availability)

### 3.1 Multi-source contribution model

**Sources of content:**
1. **Site Editor authors** (in-browser, role-gated) — patterns/blocks only.
2. **REST/headless clients** (government service APIs, kiosk forms, mobile) — write via `nds/v1` endpoints with the same workflow + validation (submitted as drafts, never auto-published unless the endpoint holds a machine-publish capability with audit).
3. **Automated feeds** (weather, KPIs, service status, notifications) — pulled by a cron job into approved-transient or CPT storage; transient data never blocks the page (source parity: cached, size-capped, timeout-guarded requests).
4. **Bulk import (migration)** — WP-CLI scripts with dry-run + diff + rollback for the YAML→CPT migration.
5. **External editors** (documents/translations) — staged through a staging post type or revision flow, then submitted.

**Conflict prevention:**
- **Block-level isolation:** each content unit is its own post (CPT) — no one edits another's content; the Site Editor only touches template structure, which is versioned in the theme (deploy artifact), not the DB.
- **Revision + locking:** core revisions + post locking; workflow prevents simultaneous approve/edit races.
- **Queue serialization:** a single publication queue (cron) processes approved items in order; publish actions are idempotent and re-runnable.
- **No code conflicts:** content lives in the database; code lives in the theme repo deployed via CI. The two never collide because template/pattern changes ship as theme releases (see §3.3), not as content edits.

### 3.2 Deployment & zero-downtime mechanics

| Concern | Mechanism |
|---|---|
| **Theme/plugin updates** | Blue-green deploy: build artifact (theme zip) → stage → activate on a staging site → run smoke tests → deploy to production via a load-balanced switch. WP-CLI maintenance-free (block themes + autoload-optimized options avoid full maintenance windows) |
| **Database** | Managed MySQL with read replicas for `SELECT`-heavy pages (front end reads replica; writes go to primary); object cache (Redis) with 5-minute TTL for queries and transients; core + theme options autoloaded minimally |
| **Assets/CDN** | Compiled CSS/JS + fonts + images served from object storage/CDN with cache-busting `?ver=`; images via a resize/optimize pipeline on upload (webp, explicit dims, lazy by default) |
| **Cache layering** | Full-page cache (edge + object) for anonymous visitors; personalized/authenticated pages bypass only where needed; `content-visibility` + pagination keep HTML lean |
| **High availability** | Multi-region/HA hosting: ≥2 web nodes, autoscaling on CPU/requests; health checks on `/wp-json` + a `nds/health` endpoint; failover DNS; scheduled backups (DB daily, files weekly) with tested restore |
| **Uptime & monitoring** | Synthetic checks (home LCP, key service pages, form submission), uptime alerts, error tracking (PHP + JS), audit of 404s for broken-link fixes; runbook for rollback (previous theme artifact + `wp db restore`) |

### 3.3 Release process (code vs. content)

- **Code** (theme/patterns/blocks): GitHub → CI (lint, audit catalogs, build, perf smoke, a11y snapshot) → staging → approval → blue-green production switch. Versioned tags; changelog follows the source's conventions (bundle-replacement step first, breaking changes only).
- **Content** (posts, menus, options): through the approval workflow only; the Site Editor's template edits are exported as theme artifacts and reviewed as code.
- **Emergency path:** a "fast-track publish" capability (steward) with mandatory post-hoc audit; an incident runbook for rollback and content freeze.

### 3.4 Scalability envelope

- **Content scale:** CPT architecture + paginated galleries + facet queries with indexed taxonomies handle thousands of entries (components, services, FAQs) with no degradation; `nds/component-gallery` server-renders page 1 and filters client-side (source parity, no re-query per filter).
- **Traffic scale:** edge cache absorbs anonymous traffic; replicas + Redis absorb read spikes; the write path (approval workflow) is low-volume by design.
- **Multi-site:** the theme + permission system are single-site first; multisite conversion is possible (network-wide style variations, per-site approval queues) without changing the token/block architecture.

---

## 4. Sustainability & continuous operation

- **Ownership:** runbook, on-call rota, and a documented dependency list (hosting, CDN, object cache, cron, backups).
- **Budget gates:** performance budgets in CI (LCP/FCP/CLS per page type); regression = blocked merge (the `nds-perf` discipline, re-expressed).
- **Content hygiene:** stale-content workflow (draft flag after N months, steward review), link rot checks, placeholder sweeps before launch.
- **Security:** nonces + caps on every route, sanitization on every input, escaping on every output, audit of the permission model at each release, dependency updates with tested rollback.
- **Disaster recovery:** RTO ≤ 4h / RPO ≤ 24h (DB daily + binlog), tested quarterly; CDN purge process for urgent content corrections.

---

## 5. Deliverables & sequencing

| Phase | Deliverable | Exit criteria |
|---|---|---|
| 1 | Theme + content model (migration guide §1–§3) | All CPTs, menus, patterns, blocks registered; migration dry-run clean |
| 2 | Workflow/permission system (`inc/admin.php` + statuses + caps + Approval Center) | Author → reviewer → publish round-trip works with audit trail; section scoping tested |
| 3 | REST + headless ingestion + automated feeds | Machine submissions land as drafts; feeds update transients; all routes nonce/cap-checked |
| 4 | HA infrastructure (blue-green, replicas, cache, CDN, monitoring, backups) | Failover drill passes; LCP budget holds under load test |
| 5 | Go-live + runbook + training | Data migrated; redirect map live; runbook reviewed; stakeholders trained on roles |

---

## 6. Risks & mitigations (CMS-specific)

| Risk | Mitigation |
|---|---|
| Editors bypass the design system (raw HTML, off-palette colors) | Block/pattern-only authoring, markup linter, capability gating, design-steward review gate |
| Approval bottleneck delays urgent content | Fast-track capability + audit; per-section supervisors; queue notifications |
| Concurrent edits overwrite work | Post locking + revisions + workflow statuses that block edits outside pending |
| Replica lag serves stale data | Read-your-writes for editors (admin reads primary); front-end TTL-aware |
| Cache poisoning during publish | Cache purge per post type on publish/update (targeted, not full flush) |
| Machine feed misbehaves (bad data floods) | Schema validation + size caps + circuit breaker (feed pauses on repeated failure) + manual approve for high-risk fields |
| Unauthorized publish via REST | Capability + nonce + IP allowlist for machine tokens + full audit on every publish |
