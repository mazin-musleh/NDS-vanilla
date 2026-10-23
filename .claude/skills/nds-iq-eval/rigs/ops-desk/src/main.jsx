import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { queryClient } from './queryClient.js';
import { useStore } from './store.js';
import { startUrlSync } from './url.js';
import { start, stop } from './feed.js';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

startUrlSync(useStore);

// The feed follows the Live / Paused toggle.
if (useStore.getState().live) start();
useStore.subscribe((s, prev) => {
    if (s.live !== prev.live) (s.live ? start : stop)();
});

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
        </QueryClientProvider>
    </React.StrictMode>
);
