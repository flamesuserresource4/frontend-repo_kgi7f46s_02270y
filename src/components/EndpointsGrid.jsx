import React from 'react';
import EndpointCard from './EndpointCard';

const apiBase = 'http://51.222.14.176:25576';

export default function EndpointsGrid() {
  const cards = [
    {
      method: 'GET',
      path: '/download/youtube/audio',
      params: ['url'],
      example: `${apiBase}/download/youtube/audio?url=https://youtu.be/VIDEO_ID`,
    },
    {
      method: 'GET',
      path: '/download/youtube/video',
      params: ['url'],
      example: `${apiBase}/download/youtube/video?url=https://youtu.be/VIDEO_ID`,
    },
    {
      method: 'GET',
      path: '/download/youtube/videofhd',
      params: ['url'],
      example: `${apiBase}/download/youtube/videofhd?url=https://youtu.be/VIDEO_ID`,
    },
    {
      method: 'GET',
      path: '/download/youtube/search',
      params: ['query', 'media_type', 'max_results'],
      example: `${apiBase}/download/youtube/search?query=lofi&media_type=video&max_results=5`,
    },
    {
      method: 'GET',
      path: '/download/{platform}/{media_type}',
      description: 'platform: instagram/facebook/tiktok/spotify | media_type: video/audio',
      params: ['platform', 'media_type', 'url'],
      example: `${apiBase}/download/instagram/video?url=https://instagram.com/p/POST_ID`,
    },
    {
      method: 'POST',
      path: '/download/infofile',
      params: ['file_url'],
      example: `curl -X POST ${apiBase}/download/infofile -H 'Content-Type: application/json' -d '{"file_url":"https://.../file.info"}'`,
    },
    {
      method: 'GET',
      path: '/health',
      example: `${apiBase}/health`,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Endpoints</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <EndpointCard key={c.path + c.method} {...c} />
        ))}
      </div>
    </section>
  );
}
