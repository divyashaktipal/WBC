import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isBuyer } = useAuth();

  const [featuredFoodItems, setFeaturedFoodItems] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || !isBuyer()) {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [navigate, isAuthenticated, isBuyer]);

  const fetchDashboardData = async () => {
    try {
      // Fetch featured food items
      const foodResponse = await fetch(
        "http://localhost:5000/api/food-items?limit=6&sortBy=rating.average&sortOrder=desc"
      );
      if (foodResponse.ok) {
        const foodData = await foodResponse.json();
        setFeaturedFoodItems(foodData.data);
      }

      // Fetch top sellers
      const sellersResponse = await fetch(
        "http://localhost:5000/api/users/sellers?limit=4"
      );
      if (sellersResponse.ok) {
        const sellersData = await sellersResponse.json();
        setTopSellers(sellersData.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome, {user?.name}!</h1>
            <p>Discover amazing homemade food from local women entrepreneurs</p>
          </div>
          <div className="header-actions">
            <Link to="/marketplace" className="btn btn-primary">
              Browse Homemade Items
            </Link>
          </div>
        </div>

        {/* Homemade Notice */}
        <div className="homemade-notice">
          <div className="notice-content">
            <div className="notice-icon">🏠</div>
            <div className="notice-text">
              <h3>100% Homemade Items</h3>
              <p>
                All food items on our platform are homemade by talented women
                entrepreneurs. Each item is prepared with love in home kitchens
                using fresh, quality ingredients.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for food items, sellers, or categories..."
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="search-filters">
            <select className="filter-select">
              <option value="">All Categories</option>
              <option value="appetizers">Appetizers</option>
              <option value="main-courses">Main Courses</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
            </select>
            <select className="filter-select">
              <option value="">All Dietary</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten Free</option>
              <option value="dairy-free">Dairy Free</option>
            </select>
          </div>
        </div>

        {/* Featured Food Items */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Featured Food Items</h2>
            <Link to="/marketplace" className="btn btn-secondary">
              View All
            </Link>
          </div>

          {featuredFoodItems.length > 0 ? (
            <div className="food-items-grid">
              {featuredFoodItems.map((item) => (
                <div key={item._id} className="food-item-card">
                  <div className="food-item-image">
                    {item.images && item.images.length > 0 ? (
                      <img src={item.images[0]} alt={item.name} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                    <div className="food-item-badge">⭐ Featured</div>
                  </div>
                  <div className="food-item-content">
                    <h3>{item.name}</h3>
                    <p className="food-item-description">{item.description}</p>
                    <p className="food-item-price">${item.price}</p>
                    <p className="food-item-seller">
                      by {item.seller?.businessName || item.seller?.name}
                    </p>
                    <div className="food-item-rating">
                      <span className="rating">
                        ⭐ {item.rating.average.toFixed(1)}
                      </span>
                      <span className="reviews">
                        ({item.rating.count} reviews)
                      </span>
                    </div>
                    <div className="food-item-actions">
                      <Link
                        to={`/food-item/${item._id}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                      <button className="btn btn-secondary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🍽️</div>
              <h3>No food items available</h3>
              <p>Check back later for amazing food from our sellers</p>
            </div>
          )}
        </div>

        {/* Top Sellers */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Top Sellers</h2>
            <Link to="/sellers" className="btn btn-secondary">
              View All Sellers
            </Link>
          </div>

          {topSellers.length > 0 ? (
            <div className="sellers-grid">
              {topSellers.map((seller) => (
                <div key={seller._id} className="seller-card">
                  <div className="seller-avatar">
                    {seller.profileImage ? (
                      <img src={seller.profileImage} alt={seller.name} />
                    ) : (
                      <div className="no-avatar">{seller.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="seller-content">
                    <h3>{seller.businessName || seller.name}</h3>
                    <p className="seller-name">by {seller.name}</p>
                    {seller.businessDescription && (
                      <p className="seller-description">
                        {seller.businessDescription}
                      </p>
                    )}
                    <div className="seller-actions">
                      <Link
                        to={`/seller/${seller._id}`}
                        className="btn btn-primary"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">👩‍🍳</div>
              <h3>No sellers available</h3>
              <p>Check back later for amazing sellers</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/marketplace" className="quick-action-card">
              <div className="action-icon">🛒</div>
              <h3>Browse Marketplace</h3>
              <p>Discover food from local sellers</p>
            </Link>
            <Link to="/orders" className="quick-action-card">
              <div className="action-icon">📦</div>
              <h3>My Orders</h3>
              <p>Track your order history</p>
            </Link>
            <Link to="/favorites" className="quick-action-card">
              <div className="action-icon">❤️</div>
              <h3>Favorites</h3>
              <p>View your saved items</p>
            </Link>
            <Link to="/profile" className="quick-action-card">
              <div className="action-icon">👤</div>
              <h3>Edit Profile</h3>
              <p>Update your information</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
