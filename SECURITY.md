# Security Policy

## Supported versions

| Version | Supported |
|---|---|
| 1.0.x   | Yes |
| < 1.0   | No  |

## Reporting a vulnerability

Please **do not** open a public issue for security concerns.

### Preferred: GitHub Security Advisories

Use the **"Report a vulnerability"** button on the repository's [Security tab](https://github.com/mazin-musleh/NDS-vanilla/security). This keeps the discussion private between you and the maintainer.

### Alternative: email

Send details to `` with the subject line `[NDS Security]`.

Please include:

- The component or file affected.
- A description of the issue and its potential impact.
- Steps to reproduce, or a proof-of-concept.
- Any relevant browser / environment details.

## What to expect

- **Acknowledgment within 7 days.** The maintainer will confirm receipt and begin triage.
- **No fixed SLA for remediation.** This is a static-site template maintained part-time. Fix timelines depend on severity, complexity, and available time. Critical issues are prioritized.
- **Coordinated disclosure.** We'll work with you to agree on a disclosure timeline before any public discussion.

## Scope

This project is a static-site template — HTML, CSS, and JavaScript compiled by Jekyll. There is no server-side runtime component. Security impact is limited to:

- **XSS or UI manipulation** via components rendering user-controlled content on adopter sites.
- **Supply chain** — the build depends on Ruby gems (Jekyll, Webrick) and one npm package (Terser). Dependabot is enabled.
- **Template misuse** — e.g. a fork deploying the DGA digital-stamp with the `00000000000` placeholder still visible.

## Out of scope

- Vulnerabilities in adopter sites not caused by the template itself.
- Vulnerabilities in the official DGA React/Storybook library (report those to DGA).
- Issues with third-party dependencies — please report upstream.
