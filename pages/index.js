export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🔁 Proxy Pi Network</h1>
      <p>
        Kirim request langsung ke <code>/v2/me</code> atau endpoint lainnya dari{' '}
        <code>api.mainnet.minepi.com</code> tanpa menggunakan /api/proxy.
      </p>
    </div>
  );
}
