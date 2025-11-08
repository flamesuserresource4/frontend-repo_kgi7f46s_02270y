import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EndpointsGrid from './components/EndpointsGrid';
import ApiTester from './components/ApiTester';
import LogsPanel from './components/LogsPanel';

function App() {
  const [view, setView] = React.useState('explorer');

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200">
      <Navbar currentView={view} setView={setView} />
      <main>
        <Hero />
        <EndpointsGrid />
        <ApiTester />
        <section id="logs">{view === 'logs' && <LogsPanel />}</section>
        <footer className="border-t border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400 flex items-center justify-between">
            <span>Built for Debraj • Media Downloader API</span>
            <a className="text-blue-400 hover:text-blue-300" href="/logs.html">Open Logs Page</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
