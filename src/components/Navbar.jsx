import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Portfolio
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/#about">About</Link></li>
          <li><Link to="/#projects">Projects</Link></li>
          <li><Link to="/#skills">Skills</Link></li>
          <li><Link to="/#contact">Contact</Link></li>
          <li><Link to="/admin" className="admin-link">Admin</Link></li>
        </ul>
      </div>
    </nav>
  )
}
