---
title: Refresh
---

# Refresh

One call that tells every live NDS component the contents of a container
changed, so filters, counters, and controls follow the new content instead of
going quietly stale.

## NDS.Init.refresh(container)

Change the rows, then make one call. Pass it the container whose children
changed. It walks the component registry and updates every component that has
work in or around that container.

<code class="lang-js code">
tbody.appendChild(newRow);
NDS.Init.refresh(tbody);
</code>

It re-resolves the filter item set, selection counts, and pagination records. A
re-scan holds the user's current page; a real criteria change still resets to
page 1.

Do not call it from a handler that refresh itself dispatches — that loops.

Server-driven lists are left alone deliberately: use
`NDS.Pagination.setTotalPages()` and `NDS.Pagination.updateRecords()` when the
response arrives.
