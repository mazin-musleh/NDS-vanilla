import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NewRequest from './pages/NewRequest.jsx';
import RequestDetail from './pages/RequestDetail.jsx';
import Receipt from './pages/Receipt.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to="/requests" replace />} />
                    <Route path="requests" element={<Dashboard />} />
                    <Route path="requests/new" element={<NewRequest />} />
                    <Route path="requests/:id" element={<RequestDetail />} />
                    <Route path="requests/:id/receipt" element={<Receipt />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
