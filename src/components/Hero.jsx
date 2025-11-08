import React from 'react';
import { ArrowRight, Shield, Zap, Server } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Lightning-fast Media Downloader API
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              A clean, modern interface for testing Debraj's endpoints. Smooth animations, glass cards, and a dark slate theme with blue accents.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#explorer" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow shadow-blue-500/30">
                Explore API <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#logs" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 px-4 py-2 rounded-lg transition-colors">
                View Live Logs
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 text-slate-300">
              <div className="glass p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs">Uptime</div>
              </div>
              <div className="glass p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-white"><span className="text-emerald-400">~</span>120ms</div>
                <div className="text-xs">Avg latency</div>
              </div>
              <div className="glass p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs">Monitoring</div>
              </div>
            </dl>
          </div>
          <div className="relative">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 text-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-red-400" />
              </div>
              <pre className="mt-4 text-slate-100 text-sm overflow-x-auto"><code>{`GET http://51.222.14.176:25576/download/youtube/video
{
  "creator": "Debraj",
  "status": 200,
  "success": true,
  "result": {
    "title": "Sample Video",
    "url": "https://..."
  }
}`}</code></pre>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-blue-400" />Fast</div>
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400" />Reliable</div>
                <div className="flex items-center gap-2"><Server className="h-4 w-4 text-amber-400" />Scalable</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
