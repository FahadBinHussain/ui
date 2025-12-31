import React from 'react';
import { NewsEntry } from '../types';

interface NewsItemProps {
  item: NewsEntry;
}

const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'POLITICS': return 'text-emerald-700 bg-emerald-50';
      case 'BUSINESS': return 'text-blue-700 bg-blue-50';
      case 'TECHNOLOGY': return 'text-purple-700 bg-purple-50';
      case 'WORLD': return 'text-amber-700 bg-amber-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const getDotColor = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'POLITICS': return 'bg-emerald-500';
      case 'BUSINESS': return 'bg-blue-500';
      case 'TECHNOLOGY': return 'bg-purple-500';
      case 'WORLD': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="group py-5 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
        {/* Timestamp */}
        <div className="w-24 shrink-0 font-bold text-emerald-800 text-sm sm:text-base tracking-tight">
          {item.timestamp}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`h-2 w-2 rounded-full ${getDotColor(item.category)}`}></span>
            <span className={`text-[11px] font-bold tracking-widest uppercase ${getCategoryColor(item.category).split(' ')[0]}`}>
              {item.category}
            </span>
            {item.isPinned && (
              <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-black rounded-full uppercase tracking-tighter">
                Pinned
              </span>
            )}
          </div>
          
          <h3 className="news-headline text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-emerald-900 transition-colors">
            {item.headline}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
