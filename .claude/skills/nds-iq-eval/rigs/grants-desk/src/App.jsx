import { NavLink, Outlet } from 'react-router-dom';
import { LangProvider, useLang } from './i18n.js';

function Shell() {
    const { t, toggle } = useLang();

    return (
        <div className="shell">
            <aside className="sidebar">
                <div className="brand">
                    <span className="brand-mark">GD</span>
                    <span className="brand-text">
                        <strong>{t('appName')}</strong>
                        <small>{t('appTagline')}</small>
                    </span>
                </div>
                <nav className="sidenav">
                    <NavLink to="/requests" end>{t('navRequests')}</NavLink>
                    <NavLink to="/requests/new">{t('navNew')}</NavLink>
                    <a className="disabled" href="#reports" aria-disabled="true">{t('navReports')}</a>
                    <a className="disabled" href="#settings" aria-disabled="true">{t('navSettings')}</a>
                </nav>
                <div className="sidefoot">
                    <span className="muted">{t('signedInAs')}</span>
                    <strong>{t('reviewer')}</strong>
                    <a href="#out">{t('signOut')}</a>
                </div>
            </aside>

            <div className="main">
                <header className="topbar">
                    <button type="button" className="btn ghost" onClick={toggle}>{t('toggleLang')}</button>
                </header>
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <LangProvider>
            <Shell />
        </LangProvider>
    );
}
