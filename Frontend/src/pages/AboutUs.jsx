// Tailwind applied

const AboutUs = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About Woman Business Circle</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Empowering women entrepreneurs to build successful businesses and create lasting impact in their communities.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Woman Business Circle, we believe in the power of women entrepreneurs to transform industries and communities. 
                Our mission is to create a supportive ecosystem where women can connect, learn, grow, and succeed together.
              </p>
              <p className="text-gray-700">
                We provide networking opportunities, mentorship programs, educational resources, and a platform for women 
                to share their experiences and support each other's business journeys.
              </p>
            </div>
            <div className="h-64 rounded-2xl bg-white shadow-lg flex items-center justify-center text-gray-500 font-bold">
              Women in Business
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-gray-600">We believe in the power of working together to achieve greater success than any individual could alone.</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">We encourage creative thinking and innovative approaches to business challenges and opportunities.</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in everything we do, setting high standards for ourselves and our community.</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">❤️</div>
              <h3 className="text-xl font-bold mb-2">Support</h3>
              <p className="text-gray-600">We provide unwavering support to our community, helping them overcome challenges and celebrate successes.</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-64 rounded-2xl bg-white shadow-lg flex items-center justify-center text-gray-500 font-bold">
              Our Story
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2020, Woman Business Circle began as a small group of women entrepreneurs who recognized 
                the need for a dedicated space where women could support each other in their business endeavors.
              </p>
              <p className="text-gray-700 mb-4">
                What started as informal coffee meetings has grown into a thriving community of over 500 women 
                entrepreneurs across various industries. We've helped launch hundreds of businesses, facilitated 
                countless partnerships, and created a network that spans the globe.
              </p>
              <p className="text-gray-700">
                Today, we continue to grow and evolve, always staying true to our founding principle: 
                "We Create Opportunity, We Build Success, We Grow Together."
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center font-bold text-gray-600">CEO</div>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-gold font-semibold">Chief Executive Officer</p>
              <p className="text-gray-600 mt-2">
                Sarah brings over 15 years of experience in business development and has been instrumental 
                in growing our community from the ground up.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center font-bold text-gray-600">COO</div>
              <h3 className="text-xl font-bold">Maria Rodriguez</h3>
              <p className="text-gold font-semibold">Chief Operating Officer</p>
              <p className="text-gray-600 mt-2">
                Maria oversees our day-to-day operations and ensures that our community receives the highest 
                quality support and resources.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center font-bold text-gray-600">CMO</div>
              <h3 className="text-xl font-bold">Jennifer Chen</h3>
              <p className="text-gold font-semibold">Chief Marketing Officer</p>
              <p className="text-gray-600 mt-2">
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
