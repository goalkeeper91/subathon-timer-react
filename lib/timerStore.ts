// lib/timerStore.ts

export interface TimerState {
  accessToken: string | null;
  userId: string | null;
  userName: string | null;
  userAvatar: string | null;
  timeRemaining: number;
  isRunning: boolean;
  targetTimestamp: number | null;
  totalSubs: number;
  totalBits: number;
  totalEvents: number;
  settings: {
    initialTime: number;
    subTime: number;
    bitsTime: number;
    batchDelay: number;
  };
  eventQueue: any[];
  eventLog: any[];
}

// WICHTIG: Verhindert Reset bei Code-Änderungen in Docker/Next.js
const globalForTimer = global as unknown as { timerState: TimerState };

export const globalState = globalForTimer.timerState || {
  accessToken: null,
  userId: null,
  userName: null,
  userAvatar: null,
  timeRemaining: 1800,
  isRunning: false,
  targetTimestamp: null,
  totalSubs: 0,
  totalBits: 0,
  totalEvents: 0,
  settings: {
    initialTime: 30,
    subTime: 120,
    bitsTime: 30,
    batchDelay: 50
  },
  eventQueue: [],
  eventLog: []
};

if (process.env.NODE_ENV !== 'production') globalForTimer.timerState = globalState;

export const getTimerState = () => {
  if (globalState.isRunning && globalState.targetTimestamp) {
    const now = Date.now();
    const remaining = Math.max(0, Math.floor((globalState.targetTimestamp - now) / 1000));
    globalState.timeRemaining = remaining;
    
    if (remaining === 0) {
      globalState.isRunning = false;
      globalState.targetTimestamp = null;
    }
  }
  return globalState;
};

export const setTimerState = (update: Partial<TimerState>) => {
  // Logik für Start
  if (update.isRunning === true && !globalState.isRunning) {
    globalState.targetTimestamp = Date.now() + (globalState.timeRemaining * 1000);
    globalState.isRunning = true;
  } 
  // Logik für Pause
  else if (update.isRunning === false && globalState.isRunning) {
    const now = Date.now();
    globalState.timeRemaining = Math.max(0, Math.floor((globalState.targetTimestamp! - now) / 1000));
    globalState.targetTimestamp = null;
    globalState.isRunning = false;
  }

  // Andere Felder updaten (Stats, Settings etc.)
  Object.assign(globalState, update);
  return globalState;
};

export const addTime = (seconds: number) => {
  globalState.timeRemaining += seconds;
  if (globalState.isRunning && globalState.targetTimestamp) {
    globalState.targetTimestamp += (seconds * 1000);
  }
  return globalState;
};

export const processEvent = (type: 'sub' | 'bits', amount: number, userName: string, tier: string = '1000') => {
  // 1. Zeit-Berechnung basierend auf Tier/Menge
  let secondsToAdd = 0;
  if (type === 'sub') {
    const multiplier = tier === '2000' ? 2 : tier === '3000' ? 5 : 1;
    secondsToAdd = globalState.settings.subTime * multiplier;
    globalState.totalSubs += 1;
  } else if (type === 'bits') {
    secondsToAdd = Math.floor(amount / 100) * globalState.settings.bitsTime;
    globalState.totalBits += amount;
  }

  // 2. Zeit zum Timer hinzufügen
  globalState.timeRemaining += secondsToAdd;
  
  // Falls der Timer läuft, auch den Ziel-Zeitstempel nach hinten schieben
  if (globalState.isRunning && globalState.targetTimestamp) {
    globalState.targetTimestamp += (secondsToAdd * 1000);
  }

  // 3. Log-Eintrag erstellen
  const logEntry = {
    time: new Date().toLocaleTimeString(),
    text: type === 'sub' ? `Sub: ${userName} (+${secondsToAdd}s)` : `${amount} Bits: ${userName} (+${secondsToAdd}s)`
  };
  
  globalState.eventLog = [logEntry, ...globalState.eventLog].slice(0, 50);
  globalState.totalEvents += 1;

  return globalState;
};