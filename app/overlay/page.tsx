"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTimerLogic } from '@/hooks/useTimerLogic';

function OverlayContent() {
  const { time, isRunning, eventLog } = useTimerLogic();
  const searchParams = useSearchParams();

  // Parameter auslesen
  const textColor = searchParams.get('color') || 'ffffff';
  const showBg = searchParams.get('bg') !== 'false';
  const bgOpacity = searchParams.get('op') || '0.4';
  const showGlow = searchParams.get('glow') !== 'false';

  const lastEvent = eventLog.length > 0 ? eventLog[0] : null;

  return (
    <div className="overlay-wrapper">
      <div className="timer-container">
        <div className="timer-status">
          {isRunning ? 'SYSTEM ONLINE' : 'SYSTEM PAUSED'}
        </div>
        
        <div className="timer-display-large">
          {time}
        </div>

        {lastEvent && (
          <div className="last-event-toast">
            <span className="event-text">{lastEvent.text}</span>
          </div>
        )}
      </div>

      <style jsx global>{`
        body {
          background-color: rgba(0, 0, 0, 0) !important;
          margin: 0; padding: 0; overflow: hidden;
        }

        .overlay-wrapper {
          --dynamic-color: #${textColor};
          --dynamic-bg: rgba(0, 0, 0, ${showBg ? bgOpacity : '0'});
          --dynamic-glow: ${showGlow ? `0 0 20px #${textColor}, 0 0 40px #${textColor}` : 'none'};
          
          width: 100vw; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Courier New', Courier, monospace;
        }

        .timer-container {
          text-align: center;
          padding: 20px;
          border-left: 4px solid var(--dynamic-color);
          background: var(--dynamic-bg);
          backdrop-filter: ${showBg ? 'blur(5px)' : 'none'};
        }

        .timer-display-large {
          font-size: 8rem;
          font-weight: bold;
          color: var(--dynamic-color);
          text-shadow: var(--dynamic-glow);
        }

        .timer-status {
          font-size: 0.8rem;
          color: var(--dynamic-color);
          opacity: 0.7;
          letter-spacing: 2px;
        }

        .last-event-toast {
          margin-top: 10px;
          border-right: 2px solid var(--dynamic-color);
          color: var(--dynamic-color);
          padding: 5px 15px;
          background: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

// 2. Der korrekte Default Export als React-Komponente
const OverlayPage: React.FC = () => {
  return (
    <Suspense fallback={<div style={{color: 'white'}}>Loading Systems...</div>}>
      <OverlayContent />
    </Suspense>
  );
};

export default OverlayPage;