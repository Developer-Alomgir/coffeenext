export const metadata = {
  title: 'কফি মামা — Coffee Mama',
  description: 'Coffee Mama — 3D Coffee Shop (Winter Scene)'
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head />
      <body style={{ margin: 0, padding: 0 }}>
        <nav style={{
          position: 'fixed', top: 12, left: 12, zIndex: 9999, display: 'flex', gap: 8, alignItems:'center'
        }}>
          <a href="/" style={{ color: '#00ffa3', textDecoration: 'none', fontWeight: 700 }}>কফি মামা</a>
          <a href="/portfolio" style={{ color: '#fff', opacity:0.8, textDecoration: 'none' }}>Portfolio</a>
          <a href="/projects" style={{ color: '#fff', opacity:0.8, textDecoration: 'none' }}>Projects</a>
          <a href="/info" style={{ color: '#fff', opacity:0.8, textDecoration: 'none' }}>Info</a>
          <a href="/contact" style={{ color: '#fff', opacity:0.8, textDecoration: 'none' }}>Contact</a>
        </nav>
        {children}
        <footer style={{
          position: 'fixed', bottom: 8, right: 12, color: 'rgba(255,255,255,0.6)',
          fontSize: 12, zIndex: 9999, pointerEvents: 'none'
        }}>
          Developed by Alomgir Hossen
        </footer>
      </body>
    </html>
  );
}
