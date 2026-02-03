export interface TwitchEvent {
  id: string;
  type: 'sub' | 'bits' | 'gift';
  amount: number;
  userName: string;
  timestamp: number;
}

export interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  totalSubs: number;
  totalBits: number;
}