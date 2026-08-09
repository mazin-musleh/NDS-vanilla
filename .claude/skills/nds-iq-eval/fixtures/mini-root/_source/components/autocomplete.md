---
title: Autocomplete
---

# Autocomplete

A type-ahead field: search suggestions, live search, combobox, async option
loading. To pick several values use Multiselect.

<code class="lang-html code">
&lt;div class="nds-form-container nds-autocomplete"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label&gt;&lt;span class="nds-label"&gt;Service&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;input type="text" class="nds-input" placeholder="Start typing..."&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code>

## Data Attributes

| Attribute | Description |
|---|---|
| `data-source` | URL the suggestions are fetched from. |
| `data-strict` | Typed text must match a picked suggestion, checked at submit. |
| `data-min-chars` | Characters typed before the first fetch. |
