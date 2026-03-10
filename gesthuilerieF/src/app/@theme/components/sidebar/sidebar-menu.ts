import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Responsable Production',
    group: true,
  },
  {
    title: 'Dashboard Production',
    icon: 'activity-outline',
    link: '/pages/dashboard/production',
    home: true,
  },
  {
    title: 'Pesée & Stocks',
    icon: 'cube-outline',
    link: '/pages/stock/weighing',
  },
  {
    title: 'Matières Premières',
    icon: 'archive-outline',
    link: '/pages/raw-material',
  },
  {
    title: 'Guides de Production',
    icon: 'options-2-outline',
    link: '/pages/production/guides',
  },
  {
    title: 'Traçabilité des Lots',
    icon: 'pricetags-outline',
    link: '/pages/stock/traceability',
  },
  {
    title: 'Données IA',
    group: true,
  },
  {
    title: 'Qualité & Rendement',
    icon: 'bar-chart-2-outline',
    link: '/pages/production/quality',
  },
  {
    title: 'État Machines',
    icon: 'hard-drive-outline',
    link: '/pages/machines/state',
  },
  {
    title: 'Administrateur',
    group: true,
  },
  {
    title: 'Dashboard Admin',
    icon: 'settings-2-outline',
    link: '/pages/dashboard/admin',
  },
  {
    title: 'Gestion des Huileries',
    icon: 'home-outline',
    link: '/pages/machines/management',
  },
  {
    title: 'Comptes / Profils / Privilèges',
    icon: 'people-outline',
    link: '/pages/users',
  },
];
