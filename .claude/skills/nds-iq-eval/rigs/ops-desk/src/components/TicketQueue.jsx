import { useEffect, useMemo, useState } from 'react';
import {
    useTable,
    tableFeatures,
    rowSortingFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    createSortedRowModel,
    createPaginatedRowModel,
} from '@tanstack/react-table';
import Filters from './Filters.jsx';
import BulkBar from './BulkBar.jsx';
import StatusCell from './StatusCell.jsx';
import { PriorityBadge } from './Badge.jsx';
import { useStore } from '../store.js';
import { useTickets, useCrews } from '../queries.js';
import { applyFilters, isBreaching, relativeDue, PRIORITY_RANK, STATUS_RANK } from '../lib.js';

const features = tableFeatures({
    rowSortingFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
});

const PAGE_SIZES = [10, 25, 50];

function CrewName({ id }) {
    const { data: crews = [] } = useCrews();
    if (!id) return <span className="muted">Unassigned</span>;
    return crews.find((c) => c.id === id)?.name || id;
}

function TitleLink({ ticket }) {
    const openTicket = useStore((s) => s.openTicket);
    return (
        <button type="button" className="link-btn title-link" onClick={() => openTicket(ticket.id)}>
            {ticket.title}
        </button>
    );
}

function DetailsButton({ ticket }) {
    const openTicket = useStore((s) => s.openTicket);
    return (
        <button type="button" className="btn btn-sm" onClick={() => openTicket(ticket.id)}>
            Details
        </button>
    );
}

const columns = [
    {
        id: 'select',
        enableSorting: false,
        header: ({ table }) => (
            <input
                type="checkbox"
                aria-label="Select all on this page"
                checked={table.getIsAllPageRowsSelected()}
                ref={(el) => {
                    if (el) el.indeterminate = table.getIsSomePageRowsSelected();
                }}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                aria-label={`Select ${row.original.id}`}
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
    },
    { id: 'id', header: 'ID', accessorFn: (t) => Number(t.id.slice(2)), cell: ({ row }) => row.original.id },
    { id: 'title', header: 'Title', enableSorting: false, cell: ({ row }) => <TitleLink ticket={row.original} /> },
    {
        id: 'category',
        header: 'Category',
        enableSorting: false,
        cell: ({ row }) => (
            <>
                {row.original.category}
                <small className="sub">{row.original.subtype}</small>
            </>
        ),
    },
    { id: 'district', header: 'District', enableSorting: false, cell: ({ row }) => row.original.district },
    {
        id: 'priority',
        header: 'Priority',
        accessorFn: (t) => PRIORITY_RANK[t.priority],
        cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
    },
    {
        id: 'status',
        header: 'Status',
        accessorFn: (t) => STATUS_RANK[t.status],
        cell: ({ row }) => <StatusCell ticket={row.original} />,
    },
    { id: 'crew', header: 'Crew', enableSorting: false, cell: ({ row }) => <CrewName id={row.original.crewId} /> },
    {
        id: 'due',
        header: 'Due',
        accessorFn: (t) => new Date(t.dueAt).getTime(),
        cell: ({ row }) => (
            <span className={isBreaching(row.original) ? 'overdue' : ''}>{relativeDue(row.original.dueAt)}</span>
        ),
    },
    {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: ({ row }) => <DetailsButton ticket={row.original} />,
    },
];

export default function TicketQueue({ onNew }) {
    const { data: tickets, isLoading, isError } = useTickets();
    const filters = useStore((s) => s.filters);
    const selectedIds = useStore((s) => s.selectedIds);
    const setSelected = useStore((s) => s.setSelected);

    const [sorting, setSorting] = useState([{ id: 'due', desc: false }]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const data = useMemo(() => (tickets ? applyFilters(tickets, filters) : []), [tickets, filters]);
    const rowSelection = useMemo(() => Object.fromEntries(selectedIds.map((id) => [id, true])), [selectedIds]);

    const table = useTable({
        features,
        columns,
        data,
        getRowId: (t) => t.id,
        state: { sorting, pagination, rowSelection },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onRowSelectionChange: (updater) => {
            const next = typeof updater === 'function' ? updater(rowSelection) : updater;
            setSelected(Object.keys(next).filter((id) => next[id]));
        },
        autoResetPageIndex: false,
        enableSortingRemoval: false,
    });

    // Back to page one when the filters change; clamp when the last page empties.
    useEffect(() => setPagination((p) => ({ ...p, pageIndex: 0 })), [filters]);
    const pageCount = table.getPageCount();
    useEffect(() => {
        if (pagination.pageIndex > 0 && pagination.pageIndex >= pageCount) {
            setPagination((p) => ({ ...p, pageIndex: Math.max(0, pageCount - 1) }));
        }
    }, [pageCount, pagination.pageIndex]);

    const rows = table.getRowModel().rows;
    const first = data.length ? pagination.pageIndex * pagination.pageSize + 1 : 0;
    const last = Math.min(data.length, first + pagination.pageSize - 1);

    return (
        <section className="card queue" aria-labelledby="queue-title">
            <div className="card-head">
                <h2 id="queue-title">
                    Ticket queue <span className="count">{data.length}</span>
                </h2>
                <button type="button" className="btn btn-primary" onClick={onNew}>
                    New ticket
                </button>
            </div>
            <Filters />
            <BulkBar />
            {isLoading && <p className="muted pad">Loading tickets...</p>}
            {isError && <p className="error pad">Could not load tickets.</p>}
            {tickets && (
                <>
                    <div className="table-wrap">
                        <table className="table">
                            <thead>
                                {table.getHeaderGroups().map((group) => (
                                    <tr key={group.id}>
                                        {group.headers.map((header) => {
                                            const sorted = header.column.getIsSorted();
                                            return (
                                                <th
                                                    key={header.id}
                                                    aria-sort={sorted ? (sorted === 'asc' ? 'ascending' : 'descending') : undefined}
                                                >
                                                    {header.column.getCanSort() ? (
                                                        <button
                                                            type="button"
                                                            className="sort-btn"
                                                            onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            <table.FlexRender header={header} />
                                                            <span className="sort-mark">
                                                                {sorted === 'asc' ? '▲' : sorted === 'desc' ? '▼' : ''}
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <table.FlexRender header={header} />
                                                    )}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row.id} className={row.getIsSelected() ? 'is-selected' : ''}>
                                        {row.getAllCells().map((cell) => (
                                            <td key={cell.id} data-col={cell.column.id}>
                                                <table.FlexRender cell={cell} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {!rows.length && (
                                    <tr>
                                        <td colSpan={columns.length} className="empty">
                                            No tickets match these filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pager">
                        <span className="muted">
                            {first}-{last} of {data.length}
                        </span>
                        <label className="per-page">
                            Per page
                            <select
                                value={pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                            >
                                {PAGE_SIZES.map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="button" className="btn btn-sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            Previous
                        </button>
                        <span>
                            Page {pagination.pageIndex + 1} of {Math.max(1, pageCount)}
                        </span>
                        <button type="button" className="btn btn-sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
