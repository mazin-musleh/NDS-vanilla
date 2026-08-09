---
title: Copy
---

# Copy

One-click copy to clipboard with a checkmark confirmation. Use for reference
numbers, links, codes, and IDs.

## Copy a literal value

<code class="lang-html code">
&lt;button type="button" class="nds-btn nds-subtle nds-sm nds-copy" data-copy="REF-2026-0001" aria-label="Copy reference"&gt;
  &lt;i class="nds-icon nds-hgi-copy-01" aria-hidden="true"&gt;&lt;/i&gt;
&lt;/button&gt;
</code>

## Copy from a target

For dynamic values that change after page load, prefer `data-copy-target` over
`data-copy`. The target's text content is read at click time, so the latest
value is copied.

<code class="lang-html code">
&lt;span id="ticket-ref"&gt;REF-2026-0001&lt;/span&gt;
&lt;button type="button" class="nds-btn nds-subtle nds-sm nds-copy" data-copy-target="#ticket-ref" aria-label="Copy reference"&gt;
  &lt;i class="nds-icon nds-hgi-copy-01" aria-hidden="true"&gt;&lt;/i&gt;
&lt;/button&gt;
</code>
