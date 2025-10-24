import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
    phone: "",
    businessName: "",
    businessDescription: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  // Redirect if already authenticated
  if (isAuthenticated()) {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        // Use the auth context to handle login
        login(data.user, data.token);

        // Redirect based on user role
        if (data.user.role === "seller") {
          navigate("/seller-dashboard");
        } else {
          navigate("/buyer-dashboard");
        }
      } else {
        alert(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black"></div>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-black text-3xl font-bold tracking-wider">
                WOMAN
              </span>
              <span className="text-gold text-2xl font-bold tracking-wide">
                BUSINESS CIRCLE
              </span>
            </div>
          </div>

          {/* Form Section */}
          <div className="mb-6">
            <div className="flex border-b-2 border-gray-200 mb-6">
              <button
                className={`flex-1 py-4 font-bold text-lg transition-all duration-300 relative ${
                  isLogin
                    ? "text-gold border-b-2 border-gold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 py-4 font-bold text-lg transition-all duration-300 relative ${
                  !isLogin
                    ? "text-gold border-b-2 border-gold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {isLogin ? "Welcome Back" : "Join Our Community"}
                </h2>
                <p className="text-gray-600">
                  {isLogin
                    ? "Sign in to your account to continue"
                    : "Create your account to get started"}
                </p>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>
              )}

              {!isLogin && (
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="form-input"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className="form-input"
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex justify-between items-center">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-2 accent-gold" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-gold font-bold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full py-3 text-lg"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>

              {!isLogin && (
                <div className="text-center text-sm text-gray-600">
                  <p>
                    By creating an account, you agree to our{" "}
                    <Link
                      to="/terms"
                      className="text-gold font-bold hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-gold font-bold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              )}
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative text-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative bg-white px-4">
                  <span className="text-gray-500 text-sm">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-gray-300 rounded-lg hover:border-gold transition-all duration-300 font-bold">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                    G
                  </span>
                  Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-gray-300 rounded-lg hover:border-gold transition-all duration-300 font-bold">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                    in
                  </span>
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
