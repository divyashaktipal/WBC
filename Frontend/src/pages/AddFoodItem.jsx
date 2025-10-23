import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AddFoodItem = () => {
  const navigate = useNavigate()
  const { token, isAuthenticated, isSeller } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
    ingredients: [],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isHalal: false,
      isKosher: false
    },
    tags: []
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated() || !isSeller()) {
      navigate('/login')
      return
    }
  }, [navigate, isAuthenticated, isSeller])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/food-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          preparationTime: 30, // Default preparation time
          isHomemade: true,
          availability: {
            isAvailable: true,
            quantity: 10,
            maxOrderQuantity: 10
          }
        })
      })

      const data = await response.json()

      if (data.success) {
        navigate('/seller-dashboard')
      } else {
        setError(data.message || 'Failed to create food item')
      }
    } catch (error) {
      console.error('Error creating food item:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Add New Homemade Food Item</h1>
          <p className="text-xl text-gray-600">Share your delicious homemade creations with our community</p>
        </div>

        <div className="bg-yellow-50 border-2 border-gold rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🏠</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Homemade Items Only</h3>
              <p className="text-gray-700 mb-4">This platform is exclusively for homemade food items. Please ensure your items are:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Prepared in your home kitchen</li>
                <li>Made with fresh, quality ingredients</li>
                <li>Created using traditional or family recipes</li>
                <li>Not commercially produced or mass-manufactured</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

          {/* Basic Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label">Food Item Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Grandma's Apple Pie"
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="description" className="form-label">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe your homemade creation, including what makes it special..."
                  className="form-input resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="form-label">Price ($) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="form-label">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Category</option>
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
              </div>
            </div>
          </div>


          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ingredients</h2>
            
            <div>
              <label htmlFor="ingredients" className="form-label">Ingredients (comma-separated)</label>
              <input
                type="text"
                id="ingredients"
                value={formData.ingredients.join(', ')}
                onChange={(e) => handleArrayChange('ingredients', e.target.value)}
                placeholder="e.g., flour, eggs, butter, sugar"
                className="form-input"
              />
            </div>
          </div>

          {/* Dietary Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dietary Information</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="dietaryInfo.isVegetarian"
                  checked={formData.dietaryInfo.isVegetarian}
                  onChange={handleChange}
                  className="mr-3 accent-gold"
                />
                <span className="text-gray-700 font-medium">Vegetarian</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="dietaryInfo.isVegan"
                  checked={formData.dietaryInfo.isVegan}
                  onChange={handleChange}
                  className="mr-3 accent-gold"
                />
                <span className="text-gray-700 font-medium">Vegan</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="dietaryInfo.isGlutenFree"
                  checked={formData.dietaryInfo.isGlutenFree}
                  onChange={handleChange}
                  className="mr-3 accent-gold"
                />
                <span className="text-gray-700 font-medium">Gluten Free</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="dietaryInfo.isDairyFree"
                  checked={formData.dietaryInfo.isDairyFree}
                  onChange={handleChange}
                  className="mr-3 accent-gold"
                />
                <span className="text-gray-700 font-medium">Dairy Free</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="dietaryInfo.isHalal"
                  checked={formData.dietaryInfo.isHalal}
                  onChange={handleChange}
                  className="mr-3 accent-gold"
                />
                <span className="text-gray-700 font-medium">Halal</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="dietaryInfo.isKosher"
                  checked={formData.dietaryInfo.isKosher}
                  onChange={handleChange}
                  className="mr-3 accent-gold"
                />
                <span className="text-gray-700 font-medium">Kosher</span>
              </label>
            </div>
          </div>


          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => navigate('/seller-dashboard')} className="btn btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary flex-1">
              {loading ? 'Creating...' : 'Create Food Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFoodItem
