# NDS IQ: publish by command, not by push

## Why

Every installed copy downloads `refs/heads/main/_includes/NDS-IQ.md`. So any edit to that file on main was a publish, and drafting had to happen on a branch behind a blocking `pre-push` hook. The address cannot change for copies already out there, so the drafts move to another file instead.

## Design (owner OK 2026-10-09)

| File | What it is | Who writes it |
|---|---|---|
| `_includes/NDS-IQ-draft.md` | the rules being worked on | anyone, any time; push freely |
| `_includes/NDS-IQ.md` | what consumers download (address unchanged) | only `scripts/publish-iq.py` |

`_includes/` never reaches `_site`, so the draft needs no `exclude:` entry.

**`scripts/publish-iq.py`**: a dry run by default; `--apply` publishes.
- Checks, stopping on any failure: on `main`; the draft passes `mkrelease.check_rules()`; the heading's version has no `IQv` tag yet; the draft differs from the published file; `guides/integration-quality.md` has a history row for that version.
- `--apply`: copies the draft over the published file, makes one commit with both files (`publish(nds-iq): vX.Y`), tags `IQvX.Y`. It never pushes; it prints the push command.

**Guards**
- `mkrelease.py`: the rules text checks live in `check_rules(text)`. `verify()` runs it on the published file at template release; `publish-iq.py` runs it on the draft. `check-release-guards.py` mutates the draft.
- `pre-push` keeps its check: a hand edit of the published file is blocked. It compares with the newest `IQv` tag in main's history, so an off-main tag (`IQv3.2`) never blocks a push.
- The Pages workflow takes the rules and `guides/integration-quality.md` from the `IQv` tag whose rules file matches main's published one, not from main. Its checkout is shallow, so it matches by content, not by history. A draft or a history row on main stays off the live site until a publish tags it. Trade-off: a typo fix in that guide goes live at the next publish.

**Readers**
- Draft: the `nds-iq-eval` skill (harness prompt, scoping diff, `assemble.mjs`), `check-release-guards.py`.
- Published: the footer, both guides, `verify()`. The Pages overlay reads the matching `IQv` tag.

## Moving `iq-v4` over

1. DONE on `iq-v4`: the v4 file is the draft; `_includes/NDS-IQ.md` is main's v3.1 again.
2. `iq-v4` merges into main any time: the v4 rules ride as the draft, and the guide's v4.0 row stays off the live site.
3. Release day: `git tag -a IQv3.2 0d0e3a10` (branch `iq-v3.2`), `python scripts/publish-iq.py --apply`, then `git push origin main IQv3.2 IQv4.0`. `IQv3.2` may also go out earlier: it must only be online before v4 sends old projects to it.
