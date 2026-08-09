---
title: Table
---

# Table

Data table with sort, filter, pagination and export. The starting point for
replacing DataTables, jTable, or a similar plugin.

<code class="lang-html code">
&lt;div class="nds-table-wrapper"&gt;
  &lt;table class="nds-table"&gt;
    &lt;thead&gt;
      &lt;tr&gt;
        &lt;th data-sort="name"&gt;&lt;span class="nds-label"&gt;Name&lt;/span&gt;&lt;/th&gt;
        &lt;th data-sort="status"&gt;&lt;span class="nds-label"&gt;Status&lt;/span&gt;&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr&gt;
        &lt;td&gt;License issuance&lt;/td&gt;
        &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Active&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;
</code>

## Data Attributes

| Attribute | Description |
|---|---|
| `data-sort` | On a `<th>`. Names the column key Sort orders by. |
| `data-filter-items` | On the container Filter narrows. |
| `data-responsive` | Stacks rows into cards below the mobile breakpoint. |

Pair it with Filter, Pagination, Sort, Selection and Export.
