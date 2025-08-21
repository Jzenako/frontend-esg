import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="nav">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/upload">Upload</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
}