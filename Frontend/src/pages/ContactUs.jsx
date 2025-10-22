import { useState } from 'react'
import './ContactUs.css'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact-us">
      <div className="container">
        {/* Hero Section */}
        <section className="contact-hero">
          <h1>Get in Touch</h1>
          <p className="hero-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </section>

        <div className="contact-content">
          {/* Contact Information */}
          <section className="contact-info">
            <h2>Contact Information</h2>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>Address</h3>
                <p>
                  123 Business District<br />
                  Suite 456<br />
                  New York, NY 10001
                </p>
              </div>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <h3>Phone</h3>
                <p>
                  +1 (555) 123-4567<br />
                  Mon - Fri: 9:00 AM - 6:00 PM
                </p>
              </div>
              <div className="info-card">
                <div className="info-icon">✉️</div>
                <h3>Email</h3>
                <p>
                  info@womanbusinesscircle.com<br />
                  support@womanbusinesscircle.com
                </p>
              </div>
              <div className="info-card">
                <div className="info-icon">🕒</div>
                <h3>Office Hours</h3>
                <p>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
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
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
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
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How can I get involved?</h3>
              <p>You can get involved by attending our events, participating in our mentorship programs, and connecting with our community of women entrepreneurs. Contact us to learn more about upcoming opportunities.</p>
            </div>
            <div className="faq-item">
              <h3>What services do you offer?</h3>
              <p>We offer networking opportunities, mentorship programs, educational workshops, business resources, and access to our community of successful women entrepreneurs.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer mentorship programs?</h3>
              <p>Yes! We have a comprehensive mentorship program that connects experienced entrepreneurs with those looking to grow their businesses. Contact us to learn more about our mentorship opportunities.</p>
            </div>
            <div className="faq-item">
              <h3>How often do you hold events?</h3>
              <p>We hold monthly networking events, quarterly workshops, and annual conferences. Follow us on social media or contact us to stay updated on upcoming events.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a cost to participate?</h3>
              <p>Many of our events and programs are free or have minimal costs. Some specialized workshops may have fees. Contact us for specific pricing information.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer corporate partnerships?</h3>
              <p>Yes, we offer corporate partnership opportunities for organizations that want to support women's professional development. Contact us for more information about partnership options.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactUs
