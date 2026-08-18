export interface IDeviconItem {
  name: string;
  iconKey: string;
  svgUrl: string;
  brandColor: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'core';
}

const DEVICON_CDN_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const DEVICONS_LIST: IDeviconItem[] = [
  // --- FRONTEND ---
  {
    name: 'React',
    iconKey: 'react',
    svgUrl: `${DEVICON_CDN_BASE}/react/react-original.svg`,
    brandColor: '#61DAFB',
    category: 'frontend',
  },
  {
    name: 'Next.js',
    iconKey: 'nextjs',
    svgUrl: `${DEVICON_CDN_BASE}/nextjs/nextjs-original.svg`,
    brandColor: '#000000',
    category: 'frontend',
  },
  {
    name: 'TypeScript',
    iconKey: 'typescript',
    svgUrl: `${DEVICON_CDN_BASE}/typescript/typescript-original.svg`,
    brandColor: '#3178C6',
    category: 'frontend',
  },
  {
    name: 'JavaScript',
    iconKey: 'javascript',
    svgUrl: `${DEVICON_CDN_BASE}/javascript/javascript-original.svg`,
    brandColor: '#F7DF1E',
    category: 'frontend',
  },
  {
    name: 'HTML5',
    iconKey: 'html5',
    svgUrl: `${DEVICON_CDN_BASE}/html5/html5-original.svg`,
    brandColor: '#E34F26',
    category: 'frontend',
  },
  {
    name: 'CSS3',
    iconKey: 'css3',
    svgUrl: `${DEVICON_CDN_BASE}/css3/css3-original.svg`,
    brandColor: '#1572B6',
    category: 'frontend',
  },
  {
    name: 'Tailwind CSS',
    iconKey: 'tailwindcss',
    svgUrl: `${DEVICON_CDN_BASE}/tailwindcss/tailwindcss-original.svg`,
    brandColor: '#06B6D4',
    category: 'frontend',
  },
  {
    name: 'Vue.js',
    iconKey: 'vuejs',
    svgUrl: `${DEVICON_CDN_BASE}/vuejs/vuejs-original.svg`,
    brandColor: '#4FC08D',
    category: 'frontend',
  },
  {
    name: 'Angular',
    iconKey: 'angularjs',
    svgUrl: `${DEVICON_CDN_BASE}/angularjs/angularjs-original.svg`,
    brandColor: '#E23237',
    category: 'frontend',
  },
  {
    name: 'Svelte',
    iconKey: 'svelte',
    svgUrl: `${DEVICON_CDN_BASE}/svelte/svelte-original.svg`,
    brandColor: '#FF3E00',
    category: 'frontend',
  },
  {
    name: 'Redux',
    iconKey: 'redux',
    svgUrl: `${DEVICON_CDN_BASE}/redux/redux-original.svg`,
    brandColor: '#764ABC',
    category: 'frontend',
  },
  {
    name: 'Bootstrap',
    iconKey: 'bootstrap',
    svgUrl: `${DEVICON_CDN_BASE}/bootstrap/bootstrap-original.svg`,
    brandColor: '#7952B3',
    category: 'frontend',
  },
  {
    name: 'Sass',
    iconKey: 'sass',
    svgUrl: `${DEVICON_CDN_BASE}/sass/sass-original.svg`,
    brandColor: '#CC6699',
    category: 'frontend',
  },
  {
    name: 'Three.js',
    iconKey: 'threejs',
    svgUrl: `${DEVICON_CDN_BASE}/threejs/threejs-original.svg`,
    brandColor: '#000000',
    category: 'frontend',
  },

  // --- BACKEND ---
  {
    name: 'Java',
    iconKey: 'java',
    svgUrl: `${DEVICON_CDN_BASE}/java/java-original.svg`,
    brandColor: '#F89820',
    category: 'backend',
  },
  {
    name: 'Spring Boot',
    iconKey: 'spring',
    svgUrl: `${DEVICON_CDN_BASE}/spring/spring-original.svg`,
    brandColor: '#6DB33F',
    category: 'backend',
  },
  {
    name: 'C#',
    iconKey: 'csharp',
    svgUrl: `${DEVICON_CDN_BASE}/csharp/csharp-original.svg`,
    brandColor: '#239120',
    category: 'backend',
  },
  {
    name: '.NET',
    iconKey: 'dotnet',
    svgUrl: `${DEVICON_CDN_BASE}/dot-net/dot-net-original.svg`,
    brandColor: '#512BD4',
    category: 'backend',
  },
  {
    name: 'NodeJS',
    iconKey: 'nodejs',
    svgUrl: `${DEVICON_CDN_BASE}/nodejs/nodejs-original.svg`,
    brandColor: '#339933',
    category: 'backend',
  },
  {
    name: 'ExpressJS',
    iconKey: 'express',
    svgUrl: `${DEVICON_CDN_BASE}/express/express-original.svg`,
    brandColor: '#000000',
    category: 'backend',
  },
  {
    name: 'Python',
    iconKey: 'python',
    svgUrl: `${DEVICON_CDN_BASE}/python/python-original.svg`,
    brandColor: '#3776AB',
    category: 'backend',
  },
  {
    name: 'FastAPI',
    iconKey: 'fastapi',
    svgUrl: `${DEVICON_CDN_BASE}/fastapi/fastapi-original.svg`,
    brandColor: '#009688',
    category: 'backend',
  },
  {
    name: 'Django',
    iconKey: 'django',
    svgUrl: `${DEVICON_CDN_BASE}/django/django-plain.svg`,
    brandColor: '#092E20',
    category: 'backend',
  },
  {
    name: 'Go',
    iconKey: 'go',
    svgUrl: `${DEVICON_CDN_BASE}/go/go-original.svg`,
    brandColor: '#00ADD8',
    category: 'backend',
  },
  {
    name: 'Rust',
    iconKey: 'rust',
    svgUrl: `${DEVICON_CDN_BASE}/rust/rust-original.svg`,
    brandColor: '#DEA584',
    category: 'backend',
  },
  {
    name: 'C++',
    iconKey: 'cpp',
    svgUrl: `${DEVICON_CDN_BASE}/cplusplus/cplusplus-original.svg`,
    brandColor: '#00599C',
    category: 'backend',
  },
  {
    name: 'PHP',
    iconKey: 'php',
    svgUrl: `${DEVICON_CDN_BASE}/php/php-original.svg`,
    brandColor: '#777BB4',
    category: 'backend',
  },
  {
    name: 'Laravel',
    iconKey: 'laravel',
    svgUrl: `${DEVICON_CDN_BASE}/laravel/laravel-original.svg`,
    brandColor: '#FF2D20',
    category: 'backend',
  },
  {
    name: 'NestJS',
    iconKey: 'nestjs',
    svgUrl: `${DEVICON_CDN_BASE}/nestjs/nestjs-original.svg`,
    brandColor: '#E0234E',
    category: 'backend',
  },

  // --- DATABASE ---
  {
    name: 'MySQL',
    iconKey: 'mysql',
    svgUrl: `${DEVICON_CDN_BASE}/mysql/mysql-original.svg`,
    brandColor: '#4479A1',
    category: 'database',
  },
  {
    name: 'PostgreSQL',
    iconKey: 'postgresql',
    svgUrl: `${DEVICON_CDN_BASE}/postgresql/postgresql-original.svg`,
    brandColor: '#4169E1',
    category: 'database',
  },
  {
    name: 'SQL Server',
    iconKey: 'sql',
    svgUrl: `${DEVICON_CDN_BASE}/microsoftsqlserver/microsoftsqlserver-original.svg`,
    brandColor: '#CC2927',
    category: 'database',
  },
  {
    name: 'MongoDB',
    iconKey: 'mongodb',
    svgUrl: `${DEVICON_CDN_BASE}/mongodb/mongodb-original.svg`,
    brandColor: '#47A248',
    category: 'database',
  },
  {
    name: 'Redis',
    iconKey: 'redis',
    svgUrl: `${DEVICON_CDN_BASE}/redis/redis-original.svg`,
    brandColor: '#DC382D',
    category: 'database',
  },
  {
    name: 'SQLite',
    iconKey: 'sqlite',
    svgUrl: `${DEVICON_CDN_BASE}/sqlite/sqlite-original.svg`,
    brandColor: '#003B57',
    category: 'database',
  },
  {
    name: 'Firebase',
    iconKey: 'firebase',
    svgUrl: `${DEVICON_CDN_BASE}/firebase/firebase-plain.svg`,
    brandColor: '#FFCA28',
    category: 'database',
  },
  {
    name: 'Supabase',
    iconKey: 'supabase',
    svgUrl: `${DEVICON_CDN_BASE}/supabase/supabase-original.svg`,
    brandColor: '#3ECF8E',
    category: 'database',
  },
  {
    name: 'GraphQL',
    iconKey: 'graphql',
    svgUrl: `${DEVICON_CDN_BASE}/graphql/graphql-plain.svg`,
    brandColor: '#E10098',
    category: 'database',
  },

  // --- DEVOPS & TOOLS ---
  {
    name: 'Docker',
    iconKey: 'docker',
    svgUrl: `${DEVICON_CDN_BASE}/docker/docker-original.svg`,
    brandColor: '#2496ED',
    category: 'devops',
  },
  {
    name: 'Kubernetes',
    iconKey: 'kubernetes',
    svgUrl: `${DEVICON_CDN_BASE}/kubernetes/kubernetes-plain.svg`,
    brandColor: '#326CE5',
    category: 'devops',
  },
  {
    name: 'Git',
    iconKey: 'git',
    svgUrl: `${DEVICON_CDN_BASE}/git/git-original.svg`,
    brandColor: '#F05032',
    category: 'devops',
  },
  {
    name: 'GitHub',
    iconKey: 'github',
    svgUrl: `${DEVICON_CDN_BASE}/github/github-original.svg`,
    brandColor: '#181717',
    category: 'devops',
  },
  {
    name: 'GitLab',
    iconKey: 'gitlab',
    svgUrl: `${DEVICON_CDN_BASE}/gitlab/gitlab-original.svg`,
    brandColor: '#FC6D26',
    category: 'devops',
  },
  {
    name: 'Vite',
    iconKey: 'vite',
    svgUrl: `${DEVICON_CDN_BASE}/vitejs/vitejs-original.svg`,
    brandColor: '#646CFF',
    category: 'devops',
  },
  {
    name: 'Vercel',
    iconKey: 'vercel',
    svgUrl: `${DEVICON_CDN_BASE}/vercel/vercel-original.svg`,
    brandColor: '#000000',
    category: 'devops',
  },
  {
    name: 'Render',
    iconKey: 'render',
    svgUrl: 'https://cdn.simpleicons.org/render/46E3B7',
    brandColor: '#46E3B7',
    category: 'devops',
  },
  {
    name: 'AWS',
    iconKey: 'aws',
    svgUrl: `${DEVICON_CDN_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    brandColor: '#FF9900',
    category: 'devops',
  },
  {
    name: 'Google Cloud',
    iconKey: 'gcp',
    svgUrl: `${DEVICON_CDN_BASE}/googlecloud/googlecloud-original.svg`,
    brandColor: '#4285F4',
    category: 'devops',
  },
  {
    name: 'Linux',
    iconKey: 'linux',
    svgUrl: `${DEVICON_CDN_BASE}/linux/linux-original.svg`,
    brandColor: '#FCC624',
    category: 'devops',
  },
  {
    name: 'Nginx',
    iconKey: 'nginx',
    svgUrl: `${DEVICON_CDN_BASE}/nginx/nginx-original.svg`,
    brandColor: '#009639',
    category: 'devops',
  },
  {
    name: 'Unity',
    iconKey: 'unity',
    svgUrl: `${DEVICON_CDN_BASE}/unity/unity-original.svg`,
    brandColor: '#000000',
    category: 'tools',
  },
  {
    name: 'Unreal Engine',
    iconKey: 'unrealengine',
    svgUrl: `${DEVICON_CDN_BASE}/unrealengine/unrealengine-original.svg`,
    brandColor: '#0E1128',
    category: 'tools',
  },
  {
    name: 'Figma',
    iconKey: 'figma',
    svgUrl: `${DEVICON_CDN_BASE}/figma/figma-original.svg`,
    brandColor: '#F24E1E',
    category: 'tools',
  },
  {
    name: 'Postman',
    iconKey: 'postman',
    svgUrl: `${DEVICON_CDN_BASE}/postman/postman-original.svg`,
    brandColor: '#FF6C37',
    category: 'tools',
  },
  {
    name: 'VS Code',
    iconKey: 'vscode',
    svgUrl: `${DEVICON_CDN_BASE}/vscode/vscode-original.svg`,
    brandColor: '#007ACC',
    category: 'tools',
  },
  {
    name: 'Velo (Wix)',
    iconKey: 'wix',
    svgUrl: 'https://cdn.simpleicons.org/wix/000000',
    brandColor: '#000000',
    category: 'tools',
  },
];

// Map lookup by iconKey or lowercase name
const deviconMap = new Map<string, IDeviconItem>();
DEVICONS_LIST.forEach((item) => {
  deviconMap.set(item.iconKey.toLowerCase(), item);
  deviconMap.set(item.name.toLowerCase(), item);
});

export function getDevicon(keyOrName: string): IDeviconItem | undefined {
  if (!keyOrName) return undefined;
  const clean = keyOrName.toLowerCase().trim();
  return deviconMap.get(clean);
}

export function getDeviconSvgUrl(keyOrName: string): string {
  const item = getDevicon(keyOrName);
  if (item) return item.svgUrl;
  // If not found in curated list, attempt generic Devicon CDN convention
  const clean = keyOrName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${DEVICON_CDN_BASE}/${clean}/${clean}-original.svg`;
}
