import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <nav className="nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        
        {/* 左上角 Logo + 标题 */}
        <NavLink to="/" end style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display:'flex', alignItems:'center', gap:'6px' }}>
          <img src={logo} alt="logo" style={{ width: 24, height: 24 }} />
          <span>ESG 自主评级系统</span>
        </NavLink>

        <div style={{ flex: 1 }} />

        {/* 导航按钮 */}
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/upload" className={({ isActive }) => (isActive ? 'active' : '')}>Upload</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
      </div>
    </nav>
  );
}
