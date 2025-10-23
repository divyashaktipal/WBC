import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="mt-20 bg-blue-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm bg-blue-100"
           
          ></div>
          <div className="absolute inset-0 bg-blue-50 bg-opacity-50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-black max-w-4xl px-8">
          <div className="text-2xl md:text-4xl text-black opacity-10 font-bold tracking-wider mb-8 uppercase">
            WOMAN BUSINESS CIRCLE
          </div>
          
          <div className="text-lg md:text-xl text-yellow-400 mb-8 font-medium leading-relaxed">
            Elevate your Business to Next Level with Woman Business Circle
          </div>
          
          <div className="mb-12">
            <span className="block text-4xl md:text-6xl font-bold text-gray-400 tracking-wider mb-2 text-shadow-lg">
              WOMAN
            </span>
            <span className="block text-4xl md:text-6xl font-bold tracking-wider text-transparent bg-clip-text  [-webkit-text-stroke:2px_#FFD700]">
              BUSINESS CIRCLE
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Link 
              to="/about-us" 
              className="bg-linear-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-lg font-bold tracking-wider uppercase min-w-[200px] transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:shadow-yellow-400/40 hover:bg-linear-to-r hover:from-yellow-500 hover:to-yellow-400"
            >
              Learn More
            </Link>
            <Link 
              to="/contact-us" 
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold tracking-wider uppercase min-w-[200px] transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:translate-y-[-3px] hover:shadow-lg hover:shadow-yellow-400/30"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Networking</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with like-minded women entrepreneurs and build lasting business relationships.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Mentorship</h3>
              <p className="text-gray-600 leading-relaxed">
                Get guidance from experienced business leaders and share your knowledge with others.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Access resources, workshops, and opportunities to scale your business.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
