export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 24,
        padding: '16px 0',
        borderTop: '1px solid #e5e7eb',
        background: '#fff',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span className="helper">© {new Date().getFullYear()} ESG Demo</span>
        <a className="helper" href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}
