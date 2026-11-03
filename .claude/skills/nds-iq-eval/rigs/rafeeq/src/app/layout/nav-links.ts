import type { Dictionary } from '../i18n/ar';

export interface NavLink {
  path: string;
  key: keyof Dictionary['nav'];
  icon: string;
  exact: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { path: '/', key: 'home', icon: 'home', exact: true },
  { path: '/journeys', key: 'journeys', icon: 'route', exact: false },
  { path: '/participate', key: 'participate', icon: 'forum', exact: false },
  { path: '/help', key: 'help', icon: 'help_outline', exact: false },
];
