// hooks/useTimerLogic.ts
import { useState, useEffect, useCallback } from 'react';

// WICHTIG: Das 'export' vor 'interface' sorgt dafür, dass der Fehler verschwindet
export interface LogEntry {
  time: string;
  text: string;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export function useTimerLogic() {
  const [state, setState] = useState<any>(null);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch('/api/timer');
      if (!res.ok) throw new Error('Sync failed');
      const data = await res.json();
      setState(data);
    } catch (e) {
      console.error("Timer Sync Error:", e);
    }
  }, []);

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 1000);
    return () => clearInterval(interval);
  }, [fetchState]);

  const startTimer = async () => {
    await fetch('/api/timer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRunning: true })
    });
    fetchState();
  };

  const pauseTimer = async () => {
    await fetch('/api/timer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRunning: false })
    });
    fetchState();
  };

  const resetTimer = async () => {
    await fetch('/api/timer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        isRunning: false, 
        timeRemaining: (state?.settings?.initialTime || 30) * 60,
        totalSubs: 0,
        totalBits: 0,
        totalEvents: 0,
        eventLog: [] 
      })
    });
    fetchState();
  };

  const updateSettings = async (key: string, value: string) => {
    const numValue = parseInt(value) || 0;
    const newSettings = { ...state.settings, [key]: numValue };
    await fetch('/api/timer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: newSettings })
    });
    fetchState();
  };

  return {
    time: state ? formatTime(state.timeRemaining) : "00:00:00",
    isRunning: state?.isRunning || false,
    stats: { 
      subs: state?.totalSubs || 0, 
      bits: state?.totalBits || 0, 
      events: state?.totalEvents || 0 
    },
    settings: state?.settings || { initialTime: 30, subTime: 120, bitsTime: 30 },
    eventLog: (state?.eventLog as LogEntry[]) || [], // Hier casten wir für TS
    queueSize: state?.eventQueue?.length || 0,
    startTimer,
    pauseTimer,
    resetTimer,
    updateSettings
  };
}