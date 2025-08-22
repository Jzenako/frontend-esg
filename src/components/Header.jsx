import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <strong>frontend-esg</strong>
        <div style={{ flex: 1 }} />
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/upload" className={({ isActive }) => (isActive ? 'active' : '')}>
          Upload
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
}
