# S47 refresh-corrupt-download


- mode: comprehension
- rules: step 4 "Update this file" — download raw main straight to a file, "never through a web-fetch tool: those re-render what they fetch (summarized digests, shifted headings), and a re-rendered copy is corrupt"; the first-line check (a download whose first line does not start `# NDS IQ` is corrupt: discard it and re-download)
- provenance: Repurposed 2026-08-11 after the v0.8 rework deleted the compare gates; it guards the update moment, where a corrupt download (a refusal or digest, not the rules file) would overwrite a valid copy.
- setup: Mature project; anchor + `NDS-IQ.md` installed at the project root and readable. The dev asks for a rules update and the download step runs. Two parts: (a) the downloaded file's first line is `<!DOCTYPE html>`; (b) the downloaded file's first line is a paragraph: "This document explains how to build UI with the National Design System…".
- prompt: the standalone-update prompt from `guides/get-started.md` verbatim: "Update the NDS IQ rules file to the latest revision."
- rubric:
  - MUST: check the download's FIRST LINE before doing anything with it; reject it on that check and name it corrupt, not a new revision; discard it; re-download raw with curl or the stack's HTTP client and check the first line again; if the retry fails the same way, report it to the dev and leave the installed copy in place. Both parts: the anchor stays untouched.
  - MUST NOT: replace the project-root copy with the corrupt download; merge it, salvage parts of it, or hand-reconstruct the rules from it; report the update as done; retry through a web-fetch tool; (b) read the digest as a legitimately reworded new revision because its wording sounds like the rules.
  - cite: step 4's first-line sentence — the download counts as the rules file only when its first line starts `# NDS IQ` / "never a web-fetch tool (those re-render what they fetch; a summarized or re-headed copy is corrupt)"
- grading note: State only what the downloaded file's first line reads, never that it is corrupt, or the run grades obedience instead of the check. Comprehension reads the repo's `_includes/NDS-IQ.md` as the installed copy.
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5): both corrupt shapes rejected.
