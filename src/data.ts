import { Category, LaunchItem } from './types';
import { LayoutGrid, Gamepad2, Globe, Heart, Clock, Settings } from 'lucide-react';

export const categories: Category[] = [
  { id: 'all', name: 'All Items', icon: 'LayoutGrid' },
  { id: 'games', name: 'Games', icon: 'Gamepad2' },
  { id: 'websites', name: 'Websites', icon: 'Globe' },
  { id: 'favorites', name: 'Favorites', icon: 'Heart' },
  { id: 'recent', name: 'Recent', icon: 'Clock' },
  { id: 'manage', name: 'Manage', icon: 'Settings' },
];

export const initialItems: LaunchItem[] = [
  {
    id: '1',
    name: 'Steam',
    type: 'game',
    url: 'https://store.steampowered.com',
    appUrl: 'steam://',
    category: 'games',
    favorite: true,
    icon: 'https://images.unsplash.com/photo-1640279993485-06461e3d5232?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Epic Games',
    type: 'game',
    url: 'https://store.epicgames.com',
    appUrl: 'com.epicgames.launcher://',
    category: 'games',
    favorite: false,
    icon: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'GitHub',
    type: 'website',
    url: 'https://github.com',
    category: 'websites',
    favorite: true,
    icon: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60',
  },
];