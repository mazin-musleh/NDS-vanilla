# NDS Editorial Guide

Every word NDS ships is read by non-native speakers and by weak AI models. Write it plain.

This file is the one source for how NDS prose reads: sentences, words, claims, and tone. Read it before you write or rewrite any user-facing text: doc pages (`components/`, `layout/`, `utilities/`, `ui-shell/`, `core/`), `guides/`, the home page, `README.md`, alerts, demo and example copy, `CHANGELOG.md`, and `_includes/NDS-IQ.md`.

## 1. Sentences

- **One instruction per sentence.** Split long sentences. Never compress by dropping articles.
- **Active voice. Name who acts.** "The agent records gaps", not "gaps are recorded". In a guide, keep "you" (the developer) and "the agent" distinct in every sentence.
- **Imperative for steps.** "Paste this prompt", not "the prompt should be pasted".
- **Under ~25 words.**
- **Same word for the same thing, every time.** No synonyms for variety.
- **No `-ing` forms as nouns or adjectives.** "Before you start", not "Before starting". "Resume a session", not "Resuming".
- **Headings are nouns.** Name the content: "Legacy Library Removal", "Findings Report", "Browser Verification". Not verb phrases, not sales lines, and no `-ing` form.
- **Plain words over insider words.** Explain a term the first time, or replace it: "when the agent's context is summarized", not "a compacted context".
- **No em dashes (—) in sentences.** Use a colon, a comma, a period, or two sentences. Em dashes stay in data values (`2023 — Present`, `College — University`), in the CHANGELOG `- Name — sentence.` bullet format, and in `_includes/NDS-IQ.md`, which agents read.
- **American spelling:** "organized", "behavior", "color".

## 2. Say It Once

- A fact shown in a table, code block, list, or alert is not repeated in the prose around it.
- When two places need one fact, keep it where the reader acts on it. Link to it from the other place.
- Do not restate a heading in the first sentence under it. Do not summarize a list right before or after it.
- A rule that lives in NDS IQ is not copied into a guide. The guide says what the developer does; NDS IQ says how the agent does it.

Every copy of a fact can drift out of sync, and the reader pays for it twice.

## 3. Facts Before Words

- **Check every claim against the source before you keep or reword it:** counts, sizes, file names, API names, and what the agent does. A rewrite that polishes a wrong fact spreads it.
- **Numbers come from a count or a measurement,** never from memory. Recount before you publish ("16 templates", "~139 KB").
- **A guide describes what the rules or the code actually do.** Never promise a step the source does not take.
- **Use the claim ladder exactly:**

| Word | Means |
|---|---|
| designed to | the intent; not yet proven |
| supported | it works, and bugs in it get fixed |
| validated | checked against a named baseline (Claude Sonnet for NDS IQ) |
| tested | a named test ran and passed |
| recommended | the default choice |

Do not swap these words. "Works with any release" is a claim; "is written to work with any release" is the intent.

## 4. No Sales Words

Describe what a thing does, not how good it is. The reader is already on the site.

- Never: powerful, seamless, effortless, revolutionary, cutting-edge, sleek, beautiful.
- No benefit lists and no boasts ("so it never has to guess").
- No claim a page cannot prove ("compliance-ready").
- A score is a number, not a percentage: "a PageSpeed score of 100".

| Avoid | Write |
|---|---|
| Sleek Animations | Animations |
| Compliance Ready | DGA Page Templates |
| Build beautiful websites effortlessly | Build interfaces with the NDS components, with no framework |
| …and stay current with upgrades | …and upgrade to new releases |

## 5. Terms

Use these terms, and only these:

| Term | Meaning |
|---|---|
| **NDS** | the National Design System and this implementation |
| **NDS Vanilla Template** | the plain HTML, CSS, and JavaScript package |
| **NDS IQ (Integration Quality)** | the versioned instruction system AI coding agents use to build with NDS |
| **AI coding agent** (or **AI agent**) | a tool that reads files, edits code, runs commands, and checks results. Not "AI assistant" |
| **template** | the NDS reference package in `.nds/` |
| **runtime** | the CSS, JavaScript, fonts, icons, and other assets a page loads |
| **canonical markup** | markup copied from the NDS source, not invented. Not "correct markup" |
| **reference implementation** | an implementation meant as the authority. Not "example implementation" |
| **project-specific context** | what the developer supplies: stack, routes, integrations, constraints |
| **workflow** | inventory → plan → build → verify |
| **verification** | checking the result in a browser against the required behavior and look |
| **validated baseline** | the model tier NDS IQ is validated against. Not "minimum model" |
| **ask** / **request** / **task** | what the developer tells the agent. "Command" only for a shell command |

### Never name the brand color

The palette is themeable. A consumer sets `--brand-primary` and the whole ramp moves, so prose that names the shipped hue is wrong on their site. Name the role:

- "deep primary", not "dark green"
- "brand primary", not "brand green" or "Saudi flag green"
- "a lighter primary tint", not "a lighter green"
- "the brand variant", not "the green variant"

This covers every surface on the primary family, in prose, tables, and demo copy. Three things stay literal, because they are names: class names (`nds-green`), token names (`--colors-green-600`), and a theme seed's documented default (`--brand-primary` ships as DGA green). Status hues (success green, error red) keep their color names.

## 6. NDS IQ and AI Agents

- NDS IQ is an **instruction system**. It never "teaches" or "trains" a model.
- **The model provides the capability. NDS IQ provides the rules and the workflow.**
- Model support: "Claude Sonnet is the validated baseline for NDS IQ. The rules are designed to produce consistent results across capable AI models."
- **The developer says what to change; NDS IQ decides how the agent does it.** An everyday ask names the outcome, the content, the data, and the limits. It does not name components, markup, or verification steps.
- Never imply the developer must know NDS internals before they ask.

## 7. Languages in Demos

- **Arabic UI strings drop short vowel marks** (fatha, damma, kasra, sukun): «عسر», not «عُسْر». Keep tanwin («رأسيًا», «ثوانٍ»), and keep shadda on verbs where it carries the form («يحسّن», «أكّد»).
- **A non-Arabic RTL demo uses Persian (فارسی) or Urdu (اردو).** Never Hebrew.

## 8. Tone by Surface

| Surface | Tone | It says |
|---|---|---|
| Home page | short and factual, never a sales page | what NDS is, what the template gives, who it is for, how it works with AI agents |
| `README.md` | technical and practical | what the repo holds, how to run it, requirements, links to the docs |
| Get Started | step by step | what you do, what the agent does, what needs your approval, which files change, how verification and upgrades work |
| NDS IQ guide | system-level and precise | how the rules work, where they come from, how they are tested, versioned, and updated |
| Doc pages | plain technical book | what the part is, when to use it, how to use it. Mechanism and fact, no pitch, nothing the reader already knows |
| Demo and example copy | realistic content | real-looking names, dates, and data for a government service |

## 9. Rewriting Existing Content

- **Check the facts first** (section 3), then reword.
- Keep the technical meaning and the terms. Cut filler, repeats, and sales words.
- Shorter is right when nothing the reader acts on is lost.
- **Never change canonical markup, code blocks, or prompts a reader pastes.** Agents copy them as canon. Reword only the prose around them.
- Keep heading `id`s, so existing links still work.
- A prose-only edit on a doc page bumps `last_edit` only, never `updated`.

## 10. Checklist

Before you hand over any text:

- [ ] Every fact, count, and name was checked against the source.
- [ ] Every sentence has one instruction, an actor, and under ~25 words.
- [ ] No `-ing` nouns, no em dashes in sentences, no sales words.
- [ ] Headings are nouns.
- [ ] Each fact appears once.
- [ ] NDS terms and the claim ladder are used exactly.
- [ ] Markup, code blocks, prompts, and heading `id`s are unchanged.
