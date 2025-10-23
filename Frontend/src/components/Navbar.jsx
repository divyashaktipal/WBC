import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const Navbar = () => {
  const { user, isAuthenticated, logout, isSeller, isBuyer } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <nav className="bg-black py-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4 text-white no-underline">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col leading-tight">
                <span className="text-white text-2xl font-bold tracking-wider">WOMAN</span>
                <span className="text-white text-xl font-bold tracking-wide">BUSINESS CIRCLE</span>
              </div>
              <div className="text-gray-300 text-xs mt-1 italic">
                We Create Opportunity, We Build Success, We Grow Together
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 items-center">
          <Link to="/" className="text-white font-medium tracking-wide transition-colors duration-300 hover:text-gold relative group">
            HOME
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about-us" className="text-white font-medium tracking-wide transition-colors duration-300 hover:text-gold relative group">
            ABOUT US
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/contact-us" className="text-white font-medium tracking-wide transition-colors duration-300 hover:text-gold relative group">
            CONTACT US
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          {isAuthenticated() && isBuyer() && (
            <Link to="/marketplace" className="bg-gradient-to-r from-gold to-gold-dark text-black px-4 py-2 rounded-full font-bold transition-all duration-300 hover:from-gold-dark hover:to-gold hover:shadow-lg hover:-translate-y-0.5">
              🔍 SEARCH ITEMS
            </Link>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center">
          {isAuthenticated() ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end text-right">
                <span className="text-white font-bold text-sm">Hi, {user?.name}</span>
                <span className="text-gold text-xs font-medium">
                  {isSeller() ? '🍽️ Seller' : '🛒 Buyer'}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                {isSeller() && (
                  <Link 
                    to="/seller-dashboard" 
                    className="bg-transparent border-2 border-gold text-gold px-4 py-2 font-bold text-sm tracking-wide transition-all duration-300 rounded hover:bg-gold hover:text-black hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="bg-transparent border-2 border-red-500 text-red-500 px-4 py-2 font-bold text-sm tracking-wide transition-all duration-300 rounded hover:bg-red-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-transparent border-2 border-gold text-gold px-4 py-2 font-bold text-sm tracking-wide transition-all duration-300 rounded hover:bg-gold hover:text-black hover:shadow-lg hover:-translate-y-0.5">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
