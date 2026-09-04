function Navbar({ view, setView }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span className="brand-mark">RR</span>
          <span className="brand-name">Return Risk Scorer</span>
        </div>

        <nav className="nav-links">
          <button className={`nav-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>Dashboard</button>
          <button className={`nav-link ${view === 'orders' ? 'active' : ''}`} onClick={() => setView('orders')}>Orders</button>
          <button className={`nav-link ${view === 'returns' ? 'active' : ''}`} onClick={() => setView('returns')}>Returns</button>
        </nav>

        <div className="navbar-right">
          <button className="new-request-btn" onClick={() => setView('form')}>+ Check New Return</button>
          <span className="bell">🔔</span>
          <div className="avatar">S</div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;