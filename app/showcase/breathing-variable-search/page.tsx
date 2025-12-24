'use client';

import { useState, useRef, useEffect } from 'react';

export default function BreathingVariableSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [fontWeight, setFontWeight] = useState(400);
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const lastTypeTime = useRef<number>(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (inputRef.current && document.activeElement === inputRef.current) {
        const newTrail = {
          x: e.clientX,
          y: e.clientY,
          id: trailIdRef.current++
        };
        setCursorTrail(prev => [...prev.slice(-15), newTrail]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail(prev => prev.filter(trail => Date.now() - trail.id < 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = Date.now();
    const timeDiff = now - lastTypeTime.current;
    
    // Fast typing (< 150ms between keystrokes) = Bold/Italic (urgent)
    // Slow typing (> 300ms) = Thin (exploratory)
    if (timeDiff < 150) {
      setFontWeight(700);
      setFontStyle('italic');
    } else if (timeDiff > 300) {
      setFontWeight(200);
      setFontStyle('normal');
    } else {
      setFontWeight(400);
      setFontStyle('normal');
    }

    lastTypeTime.current = now;
    setSearchValue(e.target.value);

    // Gradually return to normal weight
    setTimeout(() => {
      setFontWeight(400);
      setFontStyle('normal');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      {/* Fluid Cursor Trail */}
      {cursorTrail.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none rounded-full bg-purple-500/30 blur-xl"
          style={{
            left: trail.x - 20,
            top: trail.y - 20,
            width: 40,
            height: 40,
            opacity: (index + 1) / cursorTrail.length * 0.5,
            transition: 'all 0.3s ease-out',
            transform: `scale(${(index + 1) / cursorTrail.length})`
          }}
        />
      ))}

      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Breathing Variable Search</h1>
          <p className="text-purple-300">
            Type fast for bold/italic (urgent) • Type slow for thin (exploratory)
          </p>
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Start typing..."
            className="w-full bg-white/10 backdrop-blur-lg border-2 border-purple-500/50 rounded-2xl px-8 py-12 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              fontWeight,
              fontStyle,
              transition: 'font-weight 0.2s ease, font-style 0.2s ease',
              height: '50vh',
              textAlign: 'center',
              caretColor: '#a855f7'
            }}
          />

          {/* Weight Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-purple-300 text-sm">
            Weight: {fontWeight} • Style: {fontStyle}
          </div>
        </div>

        {/* Visual Feedback */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="text-center">
            <div className="text-purple-300 text-sm mb-2">Thin (Slow)</div>
            <div className="w-24 h-2 bg-purple-500/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: fontWeight <= 300 ? '100%' : '0%' }}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-purple-300 text-sm mb-2">Normal</div>
            <div className="w-24 h-2 bg-purple-500/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: fontWeight === 400 ? '100%' : '0%' }}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-purple-300 text-sm mb-2">Bold (Fast)</div>
            <div className="w-24 h-2 bg-purple-500/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: fontWeight >= 600 ? '100%' : '0%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
