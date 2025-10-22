import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About Woman Business Circle</h1>
          <p className="hero-subtitle">
            Empowering women entrepreneurs to build successful businesses and create lasting impact in their communities.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Woman Business Circle, we believe in the power of women entrepreneurs to transform industries and communities. 
                Our mission is to create a supportive ecosystem where women can connect, learn, grow, and succeed together.
              </p>
              <p>
                We provide networking opportunities, mentorship programs, educational resources, and a platform for women 
                to share their experiences and support each other's business journeys.
              </p>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <span>Women in Business</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>We believe in the power of working together to achieve greater success than any individual could alone.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We encourage creative thinking and innovative approaches to business challenges and opportunities.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Excellence</h3>
              <p>We strive for excellence in everything we do, setting high standards for ourselves and our community.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Support</h3>
              <p>We provide unwavering support to our community, helping them overcome challenges and celebrate successes.</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="story-content">
            <div className="story-image">
              <div className="image-placeholder">
                <span>Our Story</span>
              </div>
            </div>
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, Woman Business Circle began as a small group of women entrepreneurs who recognized 
                the need for a dedicated space where women could support each other in their business endeavors.
              </p>
              <p>
                What started as informal coffee meetings has grown into a thriving community of over 500 women 
                entrepreneurs across various industries. We've helped launch hundreds of businesses, facilitated 
                countless partnerships, and created a network that spans the globe.
              </p>
              <p>
                Today, we continue to grow and evolve, always staying true to our founding principle: 
                "We Create Opportunity, We Build Success, We Grow Together."
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Leadership Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">CEO</div>
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Chief Executive Officer</p>
              <p className="member-bio">
                Sarah brings over 15 years of experience in business development and has been instrumental 
                in growing our community from the ground up.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">COO</div>
              </div>
              <h3>Maria Rodriguez</h3>
              <p className="member-role">Chief Operating Officer</p>
              <p className="member-bio">
                Maria oversees our day-to-day operations and ensures that our community receives the highest 
                quality support and resources.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">CMO</div>
              </div>
              <h3>Jennifer Chen</h3>
              <p className="member-role">Chief Marketing Officer</p>
              <p className="member-bio">
                Jennifer leads our marketing initiatives and helps our community build their brand presence 
                in the marketplace.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutUs
