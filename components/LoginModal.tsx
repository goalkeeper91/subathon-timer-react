"use client";
import React from 'react';
import { useTwitchAuth } from '@/hooks/useTwitchAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useTwitchAuth();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-container modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        
        <div className="login-logo">SUBATHON</div>
        <div className="login-subtitle">Live Timer System</div>
        
        <button className="btn-twitch-login" onClick={login}>
          <svg width="24" height="24" viewBox="0 0 256 268" fill="currentColor">
            <path d="M17.458 0L0 46.556v186.201h63.983v34.934h34.931l34.898-34.934h52.36L256 162.954V0H17.458zm23.259 23.263H232.73v128.029l-40.739 40.741H128L93.113 226.92v-34.886H40.717V23.263zm64.008 116.405H128V69.844h-23.275v69.824zm63.997 0h23.27V69.844h-23.27v69.824z"/>
          </svg>
          <span>Mit Twitch anmelden</span>
        </button>

        <div className="login-info">
          <h3>Systemzugriff</h3>
          <ul>
            <li>Echtzeit-Event-Synchronisation</li>
            <li>Dashboard-Berechtigungen</li>
            <li>Overlay-Konfiguration</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-out;
        }
        .modal-content {
          position: relative;
          animation: slideUp 0.4s ease-out;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-close {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.5);
          color: var(--text-primary);
          width: 40px; height: 40px;
          border-radius: 50%;
          font-size: 1.8rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
        }
        .modal-close:hover {
          background: rgba(239, 68, 68, 0.4);
          transform: rotate(90deg);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </div>
  );
}