import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './AddFoodItem.css'

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
    allergens: [],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isHalal: false,
      isKosher: false
    },
    preparationTime: '',
    availability: {
      quantity: '',
      maxOrderQuantity: 10
    },
    homemadeDetails: {
      preparationMethod: 'home-cooked',
      ingredientsSource: 'fresh-local',
      preparationTime: 'same-day'
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
          preparationTime: parseInt(formData.preparationTime),
          availability: {
            ...formData.availability,
            quantity: parseInt(formData.availability.quantity)
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
    <div className="add-food-item">
      <div className="container">
        <div className="page-header">
          <h1>Add New Homemade Food Item</h1>
          <p>Share your delicious homemade creations with our community</p>
        </div>

        <div className="homemade-guidelines">
          <div className="guideline-card">
            <h3>🏠 Homemade Items Only</h3>
            <p>This platform is exclusively for homemade food items. Please ensure your items are:</p>
            <ul>
              <li>Prepared in your home kitchen</li>
              <li>Made with fresh, quality ingredients</li>
              <li>Created using traditional or family recipes</li>
              <li>Not commercially produced or mass-manufactured</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="food-item-form">
          {error && <div className="error-message">{error}</div>}

          {/* Basic Information */}
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="name">Food Item Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Grandma's Apple Pie"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe your homemade creation, including what makes it special..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="appetizers">Appetizers</option>
                  <option value="main-courses">Main Courses</option>
                  <option value="desserts">Desserts</option>
                  <option value="beverages">Beverages</option>
                  <option value="snacks">Snacks</option>
                  <option value="salads">Salads</option>
                  <option value="soups">Soups</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten Free</option>
                  <option value="dairy-free">Dairy Free</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Homemade Details */}
          <div className="form-section">
            <h2>Homemade Details</h2>
            <p className="section-description">Tell us about your homemade preparation process</p>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="preparationMethod">Preparation Method *</label>
                <select
                  id="preparationMethod"
                  name="homemadeDetails.preparationMethod"
                  value={formData.homemadeDetails.preparationMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="home-cooked">Home Cooked</option>
                  <option value="handmade">Handmade</option>
                  <option value="artisan">Artisan</option>
                  <option value="traditional-recipe">Traditional Recipe</option>
                  <option value="family-recipe">Family Recipe</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ingredientsSource">Ingredients Source *</label>
                <select
                  id="ingredientsSource"
                  name="homemadeDetails.ingredientsSource"
                  value={formData.homemadeDetails.ingredientsSource}
                  onChange={handleChange}
                  required
                >
                  <option value="fresh-local">Fresh Local</option>
                  <option value="organic">Organic</option>
                  <option value="homegrown">Homegrown</option>
                  <option value="traditional">Traditional</option>
                  <option value="premium-quality">Premium Quality</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="preparationTime">Preparation Time *</label>
              <select
                id="preparationTime"
                name="homemadeDetails.preparationTime"
                value={formData.homemadeDetails.preparationTime}
                onChange={handleChange}
                required
              >
                <option value="same-day">Same Day</option>
                <option value="24-hours">24 Hours</option>
                <option value="2-3-days">2-3 Days</option>
                <option value="weekly-batch">Weekly Batch</option>
              </select>
            </div>
          </div>

          {/* Ingredients and Allergens */}
          <div className="form-section">
            <h2>Ingredients & Allergens</h2>
            
            <div className="form-group">
              <label htmlFor="ingredients">Ingredients (comma-separated)</label>
              <input
                type="text"
                id="ingredients"
                value={formData.ingredients.join(', ')}
                onChange={(e) => handleArrayChange('ingredients', e.target.value)}
                placeholder="e.g., flour, eggs, butter, sugar"
              />
            </div>

            <div className="form-group">
              <label htmlFor="allergens">Allergens (comma-separated)</label>
              <input
                type="text"
                id="allergens"
                value={formData.allergens.join(', ')}
                onChange={(e) => handleArrayChange('allergens', e.target.value)}
                placeholder="e.g., nuts, dairy, eggs"
              />
            </div>
          </div>

          {/* Dietary Information */}
          <div className="form-section">
            <h2>Dietary Information</h2>
            
            <div className="dietary-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="dietaryInfo.isVegetarian"
                  checked={formData.dietaryInfo.isVegetarian}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Vegetarian
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="dietaryInfo.isVegan"
                  checked={formData.dietaryInfo.isVegan}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Vegan
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="dietaryInfo.isGlutenFree"
                  checked={formData.dietaryInfo.isGlutenFree}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Gluten Free
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="dietaryInfo.isDairyFree"
                  checked={formData.dietaryInfo.isDairyFree}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Dairy Free
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="dietaryInfo.isHalal"
                  checked={formData.dietaryInfo.isHalal}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Halal
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="dietaryInfo.isKosher"
                  checked={formData.dietaryInfo.isKosher}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Kosher
              </label>
            </div>
          </div>

          {/* Availability */}
          <div className="form-section">
            <h2>Availability</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Available Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  name="availability.quantity"
                  value={formData.availability.quantity}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxOrderQuantity">Max Order Quantity</label>
                <input
                  type="number"
                  id="maxOrderQuantity"
                  name="availability.maxOrderQuantity"
                  value={formData.availability.maxOrderQuantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="10"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="preparationTime">Preparation Time (minutes) *</label>
              <input
                type="number"
                id="preparationTime"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                required
                min="1"
                placeholder="30"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" onClick={() => navigate('/seller-dashboard')} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Creating...' : 'Create Food Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFoodItem
