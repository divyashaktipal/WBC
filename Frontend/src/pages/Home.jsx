import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-watermark">
            WOMAN BUSINESS CIRCLE
          </div>
          
          <div className="hero-tagline">
            Elevate your Business to Next Level with Woman Business Circle
          </div>
          
          <div className="hero-title">
            <span className="title-woman">WOMAN</span>
            <span className="title-business">BUSINESS CIRCLE</span>
          </div>
          
          <div className="hero-buttons">
            <Link to="/about-us" className="hero-btn primary">
              LEARN MORE
            </Link>
            <Link to="/contact-us" className="hero-btn secondary">
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Content Sections */}
      <section className="features-section">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Networking</h3>
              <p>Connect with like-minded women entrepreneurs and build lasting business relationships.</p>
            </div>
            <div className="feature-card">
              <h3>Mentorship</h3>
              <p>Get guidance from experienced business leaders and share your knowledge with others.</p>
            </div>
            <div className="feature-card">
              <h3>Growth</h3>
              <p>Access resources, workshops, and opportunities to scale your business.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
