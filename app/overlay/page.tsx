"use client";
import React from 'react';
import { useTimerLogic } from '@/hooks/useTimerLogic';

export default function OverlayPage() {
  const { time, isRunning, eventLog } = useTimerLogic();

  // Das Overlay soll nur den Timer und vielleicht das letzte Event zeigen
  const lastEvent = eventLog.length > 0 ? eventLog[0] : null;

  return (
    <div className="overlay-wrapper">
      <div className="scanlines"></div>
      
      {/* Haupt-Timer Container */}
      <div className="timer-container">
        <div className={`timer-status ${isRunning ? 'active' : ''}`}>
          {isRunning ? 'SYSTEM ONLINE' : 'SYSTEM PAUSED'}
        </div>
        
        <div className="timer-display-large glitch" data-text={time}>
          {time}
        </div>

        {/* Optional: Anzeige des letzten Events direkt im Overlay */}
        {lastEvent && (
          <div className="last-event-toast">
            <span className="event-label">LATEST_SIGNAL:</span>
            <span className="event-text">{lastEvent.text}</span>
          </div>
        )}
      </div>

      <style jsx global>{`
        /* Spezielle Styles für OBS Browser-Quelle */
        body {
          background-color: rgba(0, 0, 0, 0) !important; /* Transparent für OBS */
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .overlay-wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Courier New', Courier, monospace;
        }

        .timer-container {
          text-align: center;
          padding: 20px;
          border-left: 4px solid var(--neon-purple);
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(5px);
          position: relative;
        }

        .timer-status {
          font-size: 0.8rem;
          color: var(--neon-cyan);
          letter-spacing: 2px;
          margin-bottom: -10px;
          opacity: 0.8;
        }

        .timer-display-large {
          font-size: 8rem; /* Richtig groß für den Stream */
          font-weight: bold;
          color: white;
          text-shadow: 
            0 0 10px var(--neon-purple),
            0 0 20px var(--neon-purple),
            0 0 40px var(--neon-purple);
        }

        .last-event-toast {
          margin-top: 10px;
          font-size: 1rem;
          background: rgba(var(--neon-purple-rgb), 0.2);
          color: var(--neon-cyan);
          padding: 5px 15px;
          border-right: 2px solid var(--neon-cyan);
        }

        .event-label {
          font-weight: bold;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}