import { lazy, Suspense, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import KpiRow from './components/KpiRow.jsx';
import TicketQueue from './components/TicketQueue.jsx';
import Charts from './components/Charts.jsx';
import TicketDrawer from './components/TicketDrawer.jsx';
import NewTicketModal from './components/NewTicketModal.jsx';
import { useStore } from './store.js';

const CrewBoard = lazy(() => import('./components/CrewBoard.jsx'));

export default function App() {
    const selectedTicketId = useStore((s) => s.selectedTicketId);
    const [creating, setCreating] = useState(false);

    return (
        <div className="shell">
            <TopBar />
            <main className="dashboard">
                <KpiRow />
                <TicketQueue onNew={() => setCreating(true)} />
                <section className="card crews">
                    <Suspense fallback={<p className="muted">Loading crew board...</p>}>
                        <CrewBoard />
                    </Suspense>
                </section>
                <Charts />
            </main>
            {selectedTicketId && <TicketDrawer id={selectedTicketId} />}
            {creating && <NewTicketModal onClose={() => setCreating(false)} />}
        </div>
    );
}
