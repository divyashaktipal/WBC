import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    phone: '',
    businessName: '',
    businessDescription: ''
  })
  const [isLogin, setIsLogin] = useState(true)

  // Redirect if already authenticated
  if (isAuthenticated()) {
    navigate('/')
    return null
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success) {
        // Use the auth context to handle login
        login(data.user, data.token)
        
        // Redirect based on user role
        if (data.user.role === 'seller') {
          navigate('/seller-dashboard')
        } else {
          navigate('/buyer-dashboard')
        }
      } else {
        alert(data.message || 'An error occurred')
      }
    } catch (error) {
      console.error('Auth error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-content">
          {/* Logo Section */}
          <div className="login-logo">
            <div className="logo-icon">
              <div className="golden-circle">
                <div className="circle-pattern"></div>
              </div>
            </div>
            <div className="logo-text">
              <span className="logo-woman">WOMAN</span>
              <span className="logo-business">BUSINESS CIRCLE</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <div className="form-tabs">
              <button 
                className={`tab-button ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button 
                className={`tab-button ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <h2>{isLogin ? 'Welcome Back' : 'Join Our Community'}</h2>
              <p className="form-subtitle">
                {isLogin 
                  ? 'Sign in to your account to continue' 
                  : 'Create your account to get started'
                }
              </p>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="role">I want to:</label>
                  <div className="role-selection">
                    <label className="role-option">
                      <input
                        type="radio"
                        name="role"
                        value="buyer"
                        checked={formData.role === 'buyer'}
                        onChange={handleChange}
                      />
                      <span className="role-label">
                        <span className="role-icon">🛒</span>
                        Buy Food Items
                      </span>
                    </label>
                    <label className="role-option">
                      <input
                        type="radio"
                        name="role"
                        value="seller"
                        checked={formData.role === 'seller'}
                        onChange={handleChange}
                      />
                      <span className="role-label">
                        <span className="role-icon">🍽️</span>
                        Sell Food Items
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {!isLogin && formData.role === 'seller' && (
                <>
                  <div className="form-group">
                    <label htmlFor="businessName">Business Name *</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="businessDescription">Business Description</label>
                    <textarea
                      id="businessDescription"
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleChange}
                      placeholder="Tell us about your business..."
                      rows="3"
                    />
                  </div>
                </>
              )}

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {isLogin && (
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>
              )}

              <button type="submit" className="submit-button">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              {!isLogin && (
                <div className="terms">
                  <p>
                    By creating an account, you agree to our{' '}
                    <Link to="/terms" className="terms-link">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                  </p>
                </div>
              )}
            </form>

            {/* Social Login */}
            <div className="social-login">
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <div className="social-buttons">
                <button className="social-btn google">
                  <span className="social-icon">G</span>
                  Google
                </button>
                <button className="social-btn linkedin">
                  <span className="social-icon">in</span>
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h3>Join Our Food Marketplace</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">🛒</div>
              <div className="benefit-text">
                <h4>For Buyers</h4>
                <p>Discover amazing food from local women entrepreneurs</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🍽️</div>
              <div className="benefit-text">
                <h4>For Sellers</h4>
                <p>Showcase your culinary creations and grow your business</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⭐</div>
              <div className="benefit-text">
                <h4>Quality</h4>
                <p>All food items are reviewed and rated by our community</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🤝</div>
              <div className="benefit-text">
                <h4>Community</h4>
                <p>Support women entrepreneurs in the food industry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
