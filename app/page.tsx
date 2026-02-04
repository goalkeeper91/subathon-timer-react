import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="landing-page">
      <div className="scanlines"></div>
      
      {/* Navigation Header */}
      <nav className="landing-nav">
        <div className="login-logo glitch" data-text="GOALKEEPER91">
          GOALKEEPER91
        </div>
        <Link href="/dashboard" className="btn-logout" style={{padding: '0.8rem 1.5rem'}}>
          LOGIN
        </Link>
      </nav>

      <section className="hero-section">
        <div className="badge badge-subathon">V2.0 STABLE SYSTEM</div>
        <h1 className="hero-title glitch" data-text="ULTIMATE TIMER">
          ULTIMATE TIMER
        </h1>
        <p className="hero-desc">
          Verwalte deinen Subathon mit einem hochpräzisen Interface. 
          Echtzeit-Synchronisation für Subs, Bits und Follows.
        </p>
        
        <div className="hero-cta">
          <Link href="/dashboard" className="btn-twitch-login">
            <span>ZUM DASHBOARD</span>
          </Link>
        </div>
      </section>

      {/* Feature Grid - nutzt deine Panel-Stile */}
      <section className="features-container">
        <div className="feature-item main-panel">
          <div className="stat-value" style={{color: 'var(--neon-cyan)', marginBottom: '1rem'}}>⚡</div>
          <div className="stat-label">TWITCH EVENTS</div>
          <p>Automatische Zeitberechnung für alle Alerts.</p>
        </div>
        
        <div className="feature-item main-panel">
          <div className="stat-value" style={{color: 'var(--neon-purple)', marginBottom: '1rem'}}>🎬</div>
          <div className="stat-label">OBS OVERLAY</div>
          <p>Transparentes Browser-Source Overlay inklusive.</p>
        </div>

        <div className="feature-item main-panel">
          <div className="stat-value" style={{color: 'var(--neon-pink)', marginBottom: '1rem'}}>🦾</div>
          <div className="stat-label">FULL CONTROL</div>
          <p>Manuelle Korrekturen und Log-Übersicht jederzeit.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="status-dot connected"></div>
        <span>SYSTEM STATUS: OPERATIONAL</span>
      </footer>
    </main>
  );
}