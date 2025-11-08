import React from 'react';
import { Rocket, TerminalSquare } from 'lucide-react';

export default function Navbar({ currentView, setView }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-700/40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 grid place-items-center shadow-lg shadow-blue-500/30">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">Media Downloader API</p>
            <p className="text-xs text-slate-300/70">by Debraj</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <button
            onClick={() => setView('explorer')}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'explorer'
                ? 'bg-blue-600 text-white shadow shadow-blue-500/30'
                : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            API Explorer
          </button>
          <button
            onClick={() => setView('logs')}
            className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              currentView === 'logs'
                ? 'bg-blue-600 text-white shadow shadow-blue-500/30'
                : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <TerminalSquare className="h-4 w-4" /> Logs
          </button>
        </nav>
      </div>
    </header>
  );
}
