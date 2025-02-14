export interface LaunchItem {
  id: string;
  name: string;
  type: 'game' | 'website';
  url?: string;
  appUrl?: string;  // URL pour lancer l'application native
  icon?: string;
  category: string;
  favorite: boolean;
  lastUsed?: Date;
}