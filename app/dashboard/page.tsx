"use client";
import React, { useState } from 'react';
import { useTimerLogic, LogEntry } from '@/hooks/useTimerLogic';
import { useTwitchAuth } from '@/hooks/useTwitchAuth';
import { useTwitchEvents } from '@/hooks/useTwitchEvents';

export default function DashboardPage() {
  const { user, logout, isAuthorized } = useTwitchAuth();
  
  const { 
    time, 
    isRunning, 
    stats, 
    settings, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    updateSettings,
    eventLog, 
    queueSize 
  } = useTimerLogic();

  useTwitchEvents(
    typeof window !== 'undefined' ? localStorage.getItem('twitch_access_token') : null, 
    user?.id || null
  );

  const copyObsUrl = () => {
    const url = `${window.location.origin}/overlay`;
    navigator.clipboard.writeText(url);
    alert("OBS Overlay URL kopiert!");
  };

  return (
    <div className="container active" id="mainApp">
      <div className="scanlines"></div>

      {/* User Info Bar */}
      <div className="user-info">
        <img className="user-avatar" src={user?.avatar} alt="Avatar" />
        <div className="user-details">
          <div className="user-name">{user?.name}</div>
          <div className="user-role">Streamer / Operator</div>
        </div>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>

      <div className="header">
        <h1 className="glitch" data-text="SUBATHON">SUBATHON</h1>
        <div className="subtitle">Cybernetic Management Interface</div>
        <div className="badge-container">
          <div className={`badge ${isRunning ? 'badge-live' : ''}`}>
            {isRunning ? '🔴 SYSTEM ONLINE' : '⚪ STANDBY'}
          </div>
          <div className="badge badge-subathon">💎 TWITCH CONNECTED</div>
        </div>
      </div>

      <div className="main-grid">
        {/* Linkes Panel: Timer & Steuerung */}
        <div className="main-panel">
          <div className="timer-display">{time}</div>
          
          <div className="stats-grid">
            <StatBox label="Total Subs" value={stats.subs} />
            <StatBox label="Total Bits" value={stats.bits} />
            <StatBox label="Events" value={stats.events} />
          </div>

          <div className="controls">
            <div className="control-group">
              <label>Initial Time (Min)</label>
              <input 
                type="number" 
                value={settings.initialTime} 
                onChange={(e) => updateSettings('initialTime', e.target.value)} 
              />
            </div>
            <div className="control-group">
              <label>Sub (+Sek)</label>
              <input 
                type="number" 
                value={settings.subTime} 
                onChange={(e) => updateSettings('subTime', e.target.value)} 
              />
            </div>
            <div className="control-group">
              <label>100 Bits (+Sek)</label>
              <input 
                type="number" 
                value={settings.bitsTime} 
                onChange={(e) => updateSettings('bitsTime', e.target.value)} 
              />
            </div>
          </div>

          <div className="button-group">
            <button className="btn-start" onClick={startTimer} disabled={isRunning}>Start System</button>
            <button className="btn-pause" onClick={pauseTimer} disabled={!isRunning}>Pause</button>
            <button className="btn-reset" onClick={() => { if(confirm('Reset?')) resetTimer() }}>Reset</button>
          </div>
        </div>

        {/* Rechtes Panel: Stats & OBS */}
        <div className="side-panel">
          <div className="events-panel">
            <div className="panel-title">📊 Live Queue</div>
            <div className="stat-box">
              <div className="stat-label">Pending Events</div>
              <div className="stat-value">{queueSize}</div>
            </div>
          </div>

          <div className="processing-panel" style={{ marginTop: '1rem' }}>
            <div className="panel-title">🔗 OBS Integration</div>
            <div className="control-group">
              <input 
                type="text" 
                readOnly 
                value={typeof window !== 'undefined' ? `${window.location.origin}/overlay` : ''}
                style={{ width: '100%', fontSize: '0.7rem', marginBottom: '0.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--neon-purple)', color: 'var(--neon-cyan)', padding: '5px' }}
              />
              <button className="btn-reset" style={{ width: '100%' }} onClick={copyObsUrl}>
                URL Kopieren
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Log Panel */}
      <div className="events-panel" style={{ marginTop: '1rem' }}>
        <div className="panel-title">📜 System Log</div>
        <div className="event-log">
          {eventLog.length === 0 && <div className="log-entry" style={{opacity: 0.5}}>Warte auf Events...</div>}
          {eventLog.map((log: LogEntry, i: number) => (
            <div key={`${log.time}-${i}`} className="log-entry">
              <span style={{ color: 'var(--neon-purple)' }}>[{log.time}]</span> {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hilfskomponente für die Stats
function StatBox({ label, value }: { label: string, value: number | string }) {
  return (
    <div className="stat-box">
      <div className="stat-label">{label}</div>
      <div className="stat-value large">{value}</div>
    </div>
  );
}