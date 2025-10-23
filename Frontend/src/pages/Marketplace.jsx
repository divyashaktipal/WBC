import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Marketplace = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isBuyer } = useAuth()
  
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  })

  useEffect(() => {
    if (!isAuthenticated() || !isBuyer()) {
      navigate('/login')
      return
    }

    fetchFoodItems()
  }, [navigate, isAuthenticated, isBuyer, filters, pagination.page])

  const fetchFoodItems = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
        ...(filters.search && { search: filters.search }),
        ...(filters.isVegetarian && { isVegetarian: 'true' }),
        ...(filters.isVegan && { isVegan: 'true' }),
        ...(filters.isGlutenFree && { isGlutenFree: 'true' }),
        ...(filters.isDairyFree && { isDairyFree: 'true' })
      })

      const response = await fetch(`http://localhost:5000/api/food-items?${queryParams}`)
      if (response.ok) {
        const data = await response.json()
        setFoodItems(data.data)
        setPagination(prev => ({
          ...prev,
          total: data.total,
          totalPages: Math.ceil(data.total / pagination.limit)
        }))
      }
    } catch (error) {
      console.error('Error fetching food items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchFoodItems()
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const formatCategory = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-xl text-gray-600">Loading marketplace...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Vegetarian Homemade Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover amazing vegetarian food made by talented women entrepreneurs</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex max-w-2xl mx-auto rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search for food items, sellers, or ingredients..."
                className="flex-1 px-6 py-4 text-lg border-none outline-none"
              />
              <button type="submit" className="bg-gold text-black px-6 py-4 font-bold hover:bg-gold-dark transition-colors duration-300">
                🔍
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="form-label">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Categories</option>
                <option value="vegetarian-appetizers">Vegetarian Appetizers</option>
                <option value="vegetarian-main-courses">Vegetarian Main Courses</option>
                <option value="vegetarian-desserts">Vegetarian Desserts</option>
                <option value="vegetarian-beverages">Vegetarian Beverages</option>
                <option value="vegetarian-snacks">Vegetarian Snacks</option>
                <option value="vegetarian-salads">Vegetarian Salads</option>
                <option value="vegetarian-soups">Vegetarian Soups</option>
                <option value="vegetarian-breakfast">Vegetarian Breakfast</option>
                <option value="vegetarian-lunch">Vegetarian Lunch</option>
                <option value="vegetarian-dinner">Vegetarian Dinner</option>
                <option value="vegan-options">Vegan Options</option>
                <option value="traditional-vegetarian">Traditional Vegetarian</option>
                <option value="fusion-vegetarian">Fusion Vegetarian</option>
                <option value="healthy-vegetarian">Healthy Vegetarian</option>
                <option value="comfort-food-vegetarian">Comfort Food Vegetarian</option>
              </select>
            </div>

            <div>
              <label className="form-label">Price Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="form-input flex-1"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="form-input flex-1"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Sort By</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="createdAt">Newest First</option>
                <option value="price">Price</option>
                <option value="rating.average">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div>
              <label className="form-label">Sort Order</label>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="form-label">Dietary Options:</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isVegetarian"
                  checked={filters.isVegetarian}
                  onChange={handleFilterChange}
                  className="mr-2 accent-gold"
                />
                <span className="text-gray-700 font-medium">Vegetarian</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isVegan"
                  checked={filters.isVegan}
                  onChange={handleFilterChange}
                  className="mr-2 accent-gold"
                />
                <span className="text-gray-700 font-medium">Vegan</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isGlutenFree"
                  checked={filters.isGlutenFree}
                  onChange={handleFilterChange}
                  className="mr-2 accent-gold"
                />
                <span className="text-gray-700 font-medium">Gluten Free</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isDairyFree"
                  checked={filters.isDairyFree}
                  onChange={handleFilterChange}
                  className="mr-2 accent-gold"
                />
                <span className="text-gray-700 font-medium">Dairy Free</span>
              </label>
            </div>
          </div>

          <div className="text-center">
            <button onClick={clearFilters} className="btn btn-secondary">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {foodItems.length} {foodItems.length === 1 ? 'Item' : 'Items'} Found
            </h2>
            <div className="text-gray-600 text-sm">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} items
            </div>
          </div>

          {foodItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foodItems.map((item) => (
                <div key={item._id} className="card group hover:shadow-2xl">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    {item.images && item.images.length > 0 ? (
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">No Image</div>
                    )}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">🌱 Vegetarian</span>
                      <span className="bg-gold text-black px-2 py-1 rounded-full text-xs font-bold">🏠 Homemade</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                    <p className="text-gold text-sm font-bold uppercase">{formatCategory(item.category)}</p>
                    <p className="text-2xl font-bold text-gray-800">${item.price}</p>
                    <p className="text-gray-600 text-sm">by {item.seller?.businessName || item.seller?.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-gold font-bold">⭐ {item.rating.average.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm">({item.rating.count} reviews)</span>
                    </div>
                    <div className="mb-3">
                      {item.availability.isAvailable ? (
                        <span className="text-green-600 font-bold text-sm">✅ Available</span>
                      ) : (
                        <span className="text-red-600 font-bold text-sm">❌ Out of Stock</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/food-item/${item._id}`} className="btn btn-primary flex-1 text-center">
                        View Details
                      </Link>
                      <button 
                        className="btn btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!item.availability.isAvailable}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No food items found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or check back later for new items</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-600 font-bold">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Marketplace
