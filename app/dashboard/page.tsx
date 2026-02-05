"use client";
import React, { useState } from 'react';
import { useTimerLogic, LogEntry } from '@/hooks/useTimerLogic';
import { useTwitchAuth } from '@/hooks/useTwitchAuth';
import { useTwitchEvents } from '@/hooks/useTwitchEvents';

export default function DashboardPage() {
  const { user, logout, isAuthorized } = useTwitchAuth();
  const [ovColor, setOvColor] = useState('ffffff');
  const [ovBg, setOvBg] = useState(true);
  const [ovOpacity, setOvOpacity] = useState('0.4');
  const [ovGlow, setOvGlow] = useState(true);
  
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

  const generatedUrl = typeof window !== 'undefined' 
  ? `${window.location.origin}/overlay?color=${ovColor.replace('#', '')}&bg=${ovBg}&op=${ovOpacity}&glow=${ovGlow}`
  : '';

  useTwitchEvents(
    typeof window !== 'undefined' ? localStorage.getItem('twitch_access_token') : null, 
    user?.id || null
  );

  const copyObsUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert("Custom Overlay URL kopiert!");
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
            <div className="panel-title">🔗 Overlay Customizer</div>
            
            <div className="control-group" style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.7rem' }}>Text Farbe</label>
              <input 
                type="color" 
                value={`#${ovColor}`} 
                onChange={(e) => setOvColor(e.target.value.replace('#', ''))}
                style={{ width: '100%', height: '30px', cursor: 'pointer', background: 'none', border: '1px solid var(--neon-purple)' }}
              />
            </div>

            <div className="control-group" style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                <input type="checkbox" checked={ovBg} onChange={(e) => setOvBg(e.target.checked)} />
                Background
              </label>
              <label style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                <input type="checkbox" checked={ovGlow} onChange={(e) => setOvGlow(e.target.checked)} />
                Glow
              </label>
            </div>

            {ovBg && (
              <div className="control-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.7rem' }}>Transparenz ({ovOpacity})</label>
                <input 
                  type="range" min="0" max="1" step="0.1" 
                  value={ovOpacity} 
                  onChange={(e) => setOvOpacity(e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--neon-purple)' }}
                />
              </div>
            )}

            <div className="control-group">
              <label style={{ fontSize: '0.7rem' }}>OBS Browser-Quelle URL:</label>
              <input 
                type="text" 
                readOnly 
                value={generatedUrl}
                style={{ 
                  width: '100%', 
                  fontSize: '0.6rem', 
                  marginBottom: '0.5rem', 
                  background: 'rgba(0,0,0,0.5)', 
                  border: '1px solid var(--neon-cyan)', 
                  color: 'var(--neon-cyan)', 
                  padding: '5px' 
                }}
              />
              <button className="btn-reset" style={{ width: '100%', padding: '10px' }} onClick={copyObsUrl}>
                URL FÜR OBS KOPIEREN
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