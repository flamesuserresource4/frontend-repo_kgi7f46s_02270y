import React from 'react';
import { Play, Loader2 } from 'lucide-react';

const endpoints = [
  { label: 'YouTube Audio', path: '/download/youtube/audio', method: 'GET' },
  { label: 'YouTube Video', path: '/download/youtube/video', method: 'GET' },
  { label: 'YouTube Video FHD', path: '/download/youtube/videofhd', method: 'GET' },
  { label: 'YouTube Search', path: '/download/youtube/search', method: 'GET', params: ['query', 'media_type', 'max_results'] },
  { label: 'Generic Platform', path: '/download/{platform}/{media_type}', method: 'GET', params: ['platform', 'media_type'] },
  { label: 'Info File', path: '/download/infofile', method: 'POST' },
  { label: 'Health', path: '/health', method: 'GET' },
];

const apiBase = 'http://51.222.14.176:25576';

export default function ApiTester() {
  const [selected, setSelected] = React.useState(endpoints[0]);
  const [inputs, setInputs] = React.useState({ url: '', query: '', media_type: '', max_results: 5, platform: '', file_url: '' });
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  const buildUrl = () => {
    let path = selected.path;
    if (path.includes('{platform}')) path = path.replace('{platform}', encodeURIComponent(inputs.platform || 'instagram'));
    if (path.includes('{media_type}')) path = path.replace('{media_type}', encodeURIComponent(inputs.media_type || 'video'));

    const urlParamNeeded = ['/download/youtube/audio','/download/youtube/video','/download/youtube/videofhd','/download/{platform}/{media_type}'].some(p => selected.path.startsWith(p));

    const url = new URL(apiBase + path);

    if (selected.label === 'YouTube Search') {
      if (inputs.query) url.searchParams.set('query', inputs.query);
      if (inputs.media_type) url.searchParams.set('media_type', inputs.media_type);
      if (inputs.max_results) url.searchParams.set('max_results', inputs.max_results);
    } else if (urlParamNeeded && inputs.url) {
      url.searchParams.set('url', inputs.url);
    }
    return url.toString();
  };

  const handleTest = async () => {
    setError(null);
    setResponse(null);
    setLoading(true);
    try {
      const url = buildUrl();
      const options = { method: selected.method };
      if (selected.method === 'POST' && selected.label === 'Info File') {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify({ file_url: inputs.file_url || inputs.url });
      }
      const res = await fetch(url, options);
      const data = await res.json().catch(() => ({ message: 'Non-JSON response', status: res.status }));
      setResponse({
        creator: 'Debraj',
        status: res.status,
        success: res.ok,
        result: data,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const example = buildUrl();

  return (
    <section id="explorer" className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Live API Tester</h2>
        <p className="text-slate-300 mt-1">Pick an endpoint, provide inputs, and see real JSON responses.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 space-y-3">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
            <label className="block text-sm text-slate-300 mb-2">Endpoint</label>
            <select
              value={selected.label}
              onChange={(e) => setSelected(endpoints.find(x => x.label === e.target.value))}
              className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {endpoints.map((e) => (
                <option key={e.label} value={e.label} className="bg-slate-900">{e.label} ({e.method})</option>
              ))}
            </select>

            <div className="mt-4 space-y-3">
              {(selected.params?.includes('platform') || selected.path.includes('{platform}')) && (
                <input
                  placeholder="platform (instagram/facebook/tiktok/spotify)"
                  value={inputs.platform}
                  onChange={(e) => setInputs({ ...inputs, platform: e.target.value })}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500"
                />
              )}
              {(selected.params?.includes('media_type') || selected.path.includes('{media_type}')) && (
                <input
                  placeholder="media_type (video/audio)"
                  value={inputs.media_type}
                  onChange={(e) => setInputs({ ...inputs, media_type: e.target.value })}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500"
                />
              )}
              {(selected.label.includes('YouTube') && selected.label !== 'YouTube Search') || selected.path.includes('{platform}') ? (
                <input
                  placeholder="Media URL"
                  value={inputs.url}
                  onChange={(e) => setInputs({ ...inputs, url: e.target.value })}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500"
                />
              ) : null}
              {selected.label === 'YouTube Search' && (
                <>
                  <input
                    placeholder="query"
                    value={inputs.query}
                    onChange={(e) => setInputs({ ...inputs, query: e.target.value })}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500"
                  />
                  <input
                    placeholder="media_type (video/audio)"
                    value={inputs.media_type}
                    onChange={(e) => setInputs({ ...inputs, media_type: e.target.value })}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500"
                  />
                  <input
                    placeholder="max_results"
                    type="number"
                    value={inputs.max_results}
                    onChange={(e) => setInputs({ ...inputs, max_results: e.target.value })}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500"
                  />
                </>
              )}
              {selected.label === 'Info File' && (
                <input
                  placeholder="file_url"
                  value={inputs.file_url}
                  onChange={(e) => setInputs({ ...inputs, file_url: e.target.value })}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500"
                />
              )}
            </div>

            <button onClick={handleTest} disabled={loading} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow shadow-blue-500/30 disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} Test API
            </button>

            <div className="mt-4 text-xs text-slate-400 break-all">
              Example: {example}
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-3">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[220px]">
            <p className="text-slate-300 text-sm mb-2">Response</p>
            {loading && <p className="text-slate-400">Loading...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {response && (
              <pre className="text-xs md:text-sm text-slate-100 overflow-x-auto"><code>{JSON.stringify(response, null, 2)}</code></pre>
            )}
            {!loading && !response && !error && (
              <p className="text-slate-500 text-sm">Run a test to see JSON here in the shape {`{"creator":"Debraj","status":200,"success":true,"result":{...}}`}.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
