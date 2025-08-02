import { NextResponse } from 'next/server';

const LOCAL_PATHS = ['/api', '/_next', '/vite.ico', '/vite.ico', '/vite.png'];

const IP_POOL = [
  '14.241.120.142',
  '112.185.192.208',
  '113.160.156.51',
  '113.161.1.223',
  '113.176.102.87',
  '115.77.187.165',
  '125.184.235.25',
  '175.198.73.187',
  '183.97.22.176',
  '203.236.58.84',
  '220.93.199.215',
  '221.144.51.60',
  '59.28.84.207',
  '61.85.151.254',
  '81.240.60.124',
];

// Fungsi ping IP (return ms atau 9999 jika gagal)
async function pingHost(ip) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1000);

  try {
    const start = Date.now();
    await fetch(`http://${ip}:31401/`, { method: 'GET', signal: controller.signal });
    clearTimeout(timeout);
    return Date.now() - start;
  } catch {
    clearTimeout(timeout);
    return 9999;
  }
}

// Pilih 3 IP acak dan ambil yang paling cepat
async function getFastestIP() {
  const sampled = IP_POOL
    .sort(() => 0.5 - Math.random()) // acak
    .slice(0, 3); // ambil 3

  const results = await Promise.all(sampled.map(async ip => ({
    ip,
    ms: await pingHost(ip)
  })));

  results.sort((a, b) => a.ms - b.ms);

  return results[0].ip;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (LOCAL_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const selectedIP = await getFastestIP();

  const proxyUrl = request.nextUrl.clone();
  proxyUrl.hostname = selectedIP;
  proxyUrl.protocol = 'http:';
  proxyUrl.port = '31401';

  return NextResponse.rewrite(proxyUrl);
}
