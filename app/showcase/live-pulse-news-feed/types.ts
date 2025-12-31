export interface NewsEntry {
  id: string;
  timestamp: string;
  category: string;
  headline: string;
  isPinned?: boolean;
  receivedAt: number; // For "a few moments ago" logic
}

export type Category = 'POLITICS' | 'BUSINESS' | 'TECHNOLOGY' | 'HEALTH' | 'WORLD' | 'SPORTS' | 'ENTERTAINMENT';
