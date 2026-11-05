import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Võ Anh Khải (Kaito) - Software & Game Developer',
    short_name: 'Kaito Portfolio',
    description: 'Portfolio of Võ Anh Khải (Kaito) - Software & Game Developer specializing in Full-Stack Web, 3D Games, and Mobile Applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
