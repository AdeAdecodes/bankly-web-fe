import { NewsArticle } from '~/types';

export const NEWS_CATEGORY_LABELS: Record<NewsArticle['category'], string> = {
  announcements: 'Announcements',
  'consular-updates': 'Consular Updates',
  immigration: 'Immigration',
  'high-commission-activities': 'High Commission Activities',
  'nigeria-australia-relations': 'Nigeria–Australia Relations',
  community: 'Community',
  events: 'Events',
};

export const SERVICE_CATEGORY_LABELS = {
  immigration: 'Immigration',
  consular: 'Consular',
} as const;

export const ROUTES = {
  home: '/',
  services: '/services',
  news: '/news',
} as const;
