import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LuggGo!',
    description: '【AIプランナー搭載】手ぶら観光/手ぶら観光カウンター情報サイト',
    start_url: '/',
    display: 'standalone',
    background_color: '#F3F3F3',
    theme_color: '#00896C',
    icons: [
    { "src": "/icon-192x192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/icon-512x512.png", "type": "image/png", "sizes": "512x512" }
    ],
  }
}