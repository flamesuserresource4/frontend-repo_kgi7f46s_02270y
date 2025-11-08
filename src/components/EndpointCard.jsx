import React from 'react';
import { Copy, Check } from 'lucide-react';

const methodColorClasses = {
  blue: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
  red: 'bg-red-500/15 text-red-300 border-red-500/20',
};

const colorByMethod = (method) => {
  switch (method) {
    case 'GET':
      return 'blue';
    case 'POST':
      return 'emerald';
    case 'PUT':
      return 'amber';
    case 'DELETE':
      return 'red';
    default:
      return 'blue';
  }
};

const Badge = ({ children, color = 'blue' }) => (
  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${methodColorClasses[color]}`}>{children}</span>
);

export default function EndpointCard({ method, path, description, params = [], example }) {
  const [copied, setCopied] = React.useState(false);
  const color = colorByMethod(method);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="group relative">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 transition-all hover:border-blue-500/30">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Badge color={color}>{method}</Badge>
            <span className="text-slate-200 font-mono text-sm break-all">{path}</span>
          </div>
          <button onClick={handleCopy} className="flex items-center shrink-0 gap-2 text-slate-300 hover:text-white text-xs px-2 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 border border-white/10">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        {description && <p className="mt-2 text-slate-400 text-sm">{description}</p>}
        {params.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {params.map((p) => (
              <span key={p} className="px-2 py-1 rounded-md bg-slate-800/70 border border-white/10 text-slate-300">{p}</span>
            ))}
          </div>
        )}
        {example && (
          <pre className="mt-4 p-3 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 overflow-x-auto"><code>{example}</code></pre>
        )}
      </div>
    </div>
  );
}
