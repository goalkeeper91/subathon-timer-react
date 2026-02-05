"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import LoginModal from '@/components/LoginModal';

export default function LandingPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="landing-page">
      <div className="scanlines"></div>
      
      {/* Navigation Header */}
      <nav className="landing-nav">
        <div className="login-logo glitch" data-text="GOALKEEPER91">
          GOALKEEPER91
        </div>
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
          <button onClick={() => setModalOpen(true)} className="btn-twitch-login">
            <span>ZUM DASHBOARD</span>
          </button>
        </div>
      </section>

      {/* Feature Grid */}
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
  
        <div className="footer-links" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
          <a href="https://goalkeeper91.de/legal/impressum" target="_blank" rel="noopener noreferrer">IMPRESSUM</a>
          <a href="https://goalkeeper91.de/legal/datenschutz" target="_blank" rel="noopener noreferrer">DATENSCHUTZ</a>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}