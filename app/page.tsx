import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-purple-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          SUBATHON.OS
        </div>
        <Link 
          href="/dashboard" 
          className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium animate-pulse">
              v2.0 System Online
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Dein Stream. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400">
                Deine Zeit.
              </span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Verwalte deinen Subathon mit einem hochpräzisen, cybernetischen Timer-System. 
              Echtzeit-Synchronisation mit Twitch-Events für Subs, Bits und Follows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/dashboard"
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl transition-transform hover:scale-105 active:scale-95"
              >
                Launch Dashboard
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </Link>
              
              <a
                href="#features"
                className="px-8 py-4 bg-zinc-900 text-zinc-300 font-semibold rounded-xl border border-white/5 hover:bg-zinc-800 transition-colors"
              >
                Features ansehen
              </a>
            </div>
          </div>

          {/* Preview Image / Visual */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 rounded-2xl blur-2xl group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-zinc-900/50 border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <div className="ml-2 text-xs text-zinc-500 font-mono">system_interface.exe</div>
              </div>
              <div className="aspect-video bg-[#050505] rounded-lg flex flex-col items-center justify-center space-y-4">
                 <div className="text-5xl font-mono text-cyan-400 tracking-widest animate-pulse">
                    04:20:00
                 </div>
                 <div className="flex gap-2">
                    <div className="w-16 h-1 bg-purple-500/50 rounded"></div>
                    <div className="w-8 h-1 bg-cyan-500/50 rounded"></div>
                    <div className="w-12 h-1 bg-zinc-800 rounded"></div>
                 </div>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Grid */}
        <section id="features" className="mt-40 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Twitch Sync" 
            desc="Automatische Zeitgutschrift bei Subs, Gift-Subs und Bits. Du musst nichts manuell machen." 
            icon="⚡"
          />
          <FeatureCard 
            title="OBS Integration" 
            desc="Einfacher Browser-Source Link für dein Stream-Overlay. Komplett transparent und anpassbar." 
            icon="🎥"
          />
          <FeatureCard 
            title="Cyber Design" 
            desc="Ein Interface, das nicht nur funktioniert, sondern auf deinem zweiten Monitor verdammt gut aussieht." 
            icon="🦾"
          />
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 text-center text-zinc-600 text-sm">
        &copy; {new Date().getFullYear()} Goalkeeper91 Timer System. Built for Streamers.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors group">
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-zinc-100">{title}</h3>
      <p className="text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  );
}