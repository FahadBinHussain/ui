'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import LiveIndicator from './components/LiveIndicator';
import NewsItem from './components/NewsItem';
import { fetchLiveNews } from './services/newsService';
import { NewsEntry } from './types';
import './styles.css';

export default function LivePulseNewsFeed() {
  const [news, setNews] = useState<NewsEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAbducted, setIsAbducted] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [showSweep, setShowSweep] = useState(false);
  const sweepTimeoutRef = useRef<number | null>(null);

  const triggerWaveEffect = () => {
    setShowSweep(false);
    setTimeout(() => {
      setShowSweep(true);
      if (sweepTimeoutRef.current) clearTimeout(sweepTimeoutRef.current);
      sweepTimeoutRef.current = window.setTimeout(() => setShowSweep(false), 1600);
    }, 10);
  };

  const handleFetchMore = async () => {
    setIsRefreshing(true);
    
    // Start UFO sequence
    setIsAbducted(true);
    setIsReturning(false);

    // Fetch news while the UFO is in flight
    const newItems = await fetchLiveNews(2);
    
    // Wait for the UFO to complete its 4s fly-through
    setTimeout(() => {
        setIsAbducted(false);
        setIsReturning(true);
        
        // Reset the "returning" state after it drops back
        setTimeout(() => setIsReturning(false), 600);

        const existingHeadlines = new Set(news.map(n => n.headline));
        const filteredNewItems = newItems.filter(newItem => !existingHeadlines.has(newItem.headline));
        
        if (filteredNewItems.length > 0) {
          setNews(prev => [...filteredNewItems, ...prev].slice(0, 15));
          triggerWaveEffect();
        }
        setIsRefreshing(false);
    }, 4000);
  };

  const loadInitialNews = useCallback(async () => {
    setIsLoading(true);
    const initialNews = await fetchLiveNews(3);
    setNews(initialNews);
    setIsLoading(false);
    triggerWaveEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadInitialNews();
    
    // Refresh every 10 seconds
    const interval = setInterval(() => {
      handleFetchMore();
    }, 10000);

    return () => {
      clearInterval(interval);
      if (sweepTimeoutRef.current) clearTimeout(sweepTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadInitialNews]);

  return (
    <div className="min-h-screen p-4 md:p-12 flex items-center justify-center bg-slate-100">
      {/* UFO FLIGHT PATH CLEARANCE: Main container is overflow-visible */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
        
        {/* Header Section - Always visible */}
        <div className="p-8 pb-6">
          <div className="flex items-center gap-4 mb-1">
            <LiveIndicator isAbducted={isAbducted} isReturning={isReturning} />
            <h2 className="news-headline text-3xl font-bold text-gray-900 tracking-tight ml-2">
              Global Pulse
            </h2>
            <div className="flex-1"></div>
            <div className="flex flex-col items-end">
                <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-500 ${isRefreshing ? 'text-emerald-500' : 'text-gray-400'}`}>
                  {isRefreshing ? 'SIGNAL INTERCEPTED' : 'UP-TO-DATE'}
                </span>
                <span className="text-[9px] text-gray-300 font-mono mt-1">EST. 1947</span>
            </div>
          </div>
          <div className="h-1 w-full bg-slate-100 relative mt-6 rounded-full overflow-hidden">
             <div className={`absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-[4000ms] ease-linear ${isRefreshing ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
          </div>
        </div>

        {/* CONTENT BOUNDARY: We wrap the news and sweep in an overflow-hidden container */}
        <div className="relative overflow-hidden rounded-b-2xl">
          {/* Visual Wave/Sweep Overlay - Stays inside this container */}
          {showSweep && <div className="sweep-overlay animate-sweep"></div>}

          <div className="px-8 pb-8 pt-2 relative min-h-[450px]">
            {isLoading ? (
              <div className="space-y-8 animate-pulse py-10">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-6">
                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-3 w-24 bg-gray-100 rounded"></div>
                      <div className="h-5 w-full bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {news.length > 0 ? (
                  news.map((item) => (
                    <NewsItem key={item.id + item.receivedAt} item={item} />
                  ))
                ) : (
                  <div className="py-20 text-center flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p className="text-gray-400 italic text-sm font-medium">Synchronizing with orbital relay...</p>
                  </div>
                )}
              </div>
            )}

            {/* Footer Action */}
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleFetchMore}
                disabled={isRefreshing}
                className="group relative px-10 py-3 border-2 border-slate-900 overflow-hidden text-slate-900 font-bold text-[11px] uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <span className="relative z-10">{isRefreshing ? 'Awaiting Data Extraction...' : 'Request Fresh Intelligence'}</span>
                <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Manual Uplink
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative footer line */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-600/5 via-emerald-500 to-emerald-600/5 rounded-b-2xl"></div>
      </div>

      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Encryption Active</span>
          <span className="text-[9px] text-slate-300 font-mono">X-PROT-22.10.S</span>
        </div>
        <div className="h-8 w-[1px] bg-slate-200"></div>
        <div className="text-[9px] text-slate-400 font-bold tracking-tighter w-24 leading-tight">
          SATELLITE LINK STABLE<br/>RECOVERY READY
        </div>
      </div>
    </div>
  );
}
