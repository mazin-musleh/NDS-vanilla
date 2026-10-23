import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listTickets, getTicket, listCrews, updateTicket, bulkUpdate } from './api.js';

export const useTickets = () => useQuery({ queryKey: ['tickets'], queryFn: listTickets });
export const useCrews = () => useQuery({ queryKey: ['crews'], queryFn: listCrews });
export const useTicket = (id) => useQuery({ queryKey: ['ticket', id], queryFn: () => getTicket(id), enabled: !!id });

// Writes the server's copy of changed tickets back into both caches.
function patchCache(qc, updated) {
    const byId = new Map(updated.map((t) => [t.id, t]));
    qc.setQueryData(['tickets'], (old) => old && old.map((t) => byId.get(t.id) || t));
    updated.forEach((t) => qc.setQueryData(['ticket', t.id], t));
}

export function useUpdateTicket() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, patch }) => updateTicket(id, patch),
        onSuccess: (ticket) => patchCache(qc, [ticket]),
    });
}

export function useBulkUpdate() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ ids, patch }) => bulkUpdate(ids, patch),
        onSuccess: (tickets) => patchCache(qc, tickets),
    });
}
