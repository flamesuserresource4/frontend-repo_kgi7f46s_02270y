import React from 'react';

const apiBase = 'http://51.222.14.176:25576';

export default function LogsPanel() {
  const [lines, setLines] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [autoScroll, setAutoScroll] = React.useState(true);
  const containerRef = React.useRef(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiBase + '/logs.txt?_=' + Date.now());
      const text = await res.text();
      const arr = text.split('\n').filter(Boolean);
      setLines(arr);
    } catch (e) {
      setLines([`ERROR fetching logs: ${e.message}`]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLogs();
    const id = setInterval(fetchLogs, 3000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, autoScroll]);

  const filtered = lines.filter((l) => l.toLowerCase().includes(filter.toLowerCase()));

  const badgeFor = (line) => {
    if (/error/i.test(line)) return <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/20">ERROR</span>;
    if (/warn|warning/i.test(line)) return <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20">WARNING</span>;
    return <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/20">INFO</span>;
  };

  const timestamp = (line) => {
    const match = line.match(/^(\d{4}-\d{2}-\d{2}[^ ]*)/);
    return match ? (
      <span className="text-emerald-300 mr-2">{match[1]}</span>
    ) : null;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold text-white">Live Logs</h2>
        <div className="flex-1" />
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search logs"
          className="w-56 bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500"
        />
        <label className="flex items-center gap-2 text-slate-300 text-sm">
          <input type="checkbox" checked={autoScroll} onChange={(e) => setAutoScroll(e.target.checked)} />
          Auto-scroll
        </label>
        <button onClick={fetchLogs} className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Refresh</button>
      </div>

      <div ref={containerRef} className="rounded-xl border border-white/10 bg-black/40 min-h-[320px] max-h-[60vh] overflow-auto p-4 font-mono text-sm text-slate-200">
        {loading && <div className="text-slate-400">Loading...</div>}
        {filtered.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {timestamp(l)}
            <span>{l}</span>
            {badgeFor(l)}
          </div>
        ))}
        {!loading && filtered.length === 0 && <div className="text-slate-500">No logs match the filter.</div>}
      </div>
    </section>
  );
}
