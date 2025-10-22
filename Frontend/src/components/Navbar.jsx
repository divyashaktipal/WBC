import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, isAuthenticated, logout, isSeller, isBuyer } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <div className="golden-circle">
                <div className="circle-pattern"></div>
              </div>
            </div>
            <div className="logo-text">
              <div className="logo-main">
                <span className="logo-woman">WOMAN</span>
                <span className="logo-business">BUSINESS CIRCLE</span>
              </div>
              <div className="logo-tagline">
                We Create Opportunity, We Build Success, We Grow Together
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/about-us" className="nav-link">ABOUT US</Link>
          <Link to="/contact-us" className="nav-link">CONTACT US</Link>
        </div>

        {/* User Actions */}
        <div className="navbar-actions">
          {isAuthenticated() ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-name">Hi, {user?.name}</span>
                <span className="user-role">
                  {isSeller() ? '🍽️ Seller' : '🛒 Buyer'}
                </span>
              </div>
              <div className="user-actions">
                <Link 
                  to={isSeller() ? '/seller-dashboard' : '/buyer-dashboard'} 
                  className="dashboard-btn"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-btn">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
