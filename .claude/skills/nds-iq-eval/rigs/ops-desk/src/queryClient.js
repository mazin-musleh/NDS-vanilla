import { QueryClient } from '@tanstack/react-query';

// The live feed keeps the cache current, so nothing refetches on its own.
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: Infinity, refetchOnWindowFocus: false, retry: 1 },
    },
});
