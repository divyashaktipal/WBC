import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // for icons (from lucide-react package)

const SellerDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy data (same as before)
  const dashboardData = {
    totalProducts: 24,
    monthlySales: "₹12,500",
    pendingOrders: 5,
  };

  const products = [
    {
      id: 1,
      name: "Handmade Earrings",
      price: "₹499",
      stock: 12,
      status: "Active",
    },
    { id: 2, name: "Silk Saree", price: "₹2,999", stock: 8, status: "Active" },
    {
      id: 3,
      name: "Designer Handbag",
      price: "₹1,799",
      stock: 0,
      status: "Out of Stock",
    },
  ];

  const orders = [
    {
      id: "ORD001",
      customer: "Priya Sharma",
      product: "Handmade Earrings",
      amount: "₹499",
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Anjali Patel",
      product: "Silk Saree",
      amount: "₹2,999",
      status: "Shipped",
    },
    {
      id: "ORD003",
      customer: "Meera Reddy",
      product: "Designer Handbag",
      amount: "₹1,799",
      status: "Delivered",
    },
  ];

  const payments = {
    currentBalance: "₹5,000",
    lastPayout: "20 Oct 2025",
    pendingAmount: "₹2,500",
  };

  const messages = [
    {
      id: 1,
      from: "Customer Support",
      subject: "Welcome to Seller Panel!",
      date: "2025-01-15",
    },
    {
      id: 2,
      from: "Buyer Query",
      subject: "Product Size Information",
      date: "2025-01-14",
    },
  ];

  // ----- Render Sections -----
  const renderDashboard = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">📊 Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Total Products</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.totalProducts}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Monthly Sales</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.monthlySales}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Pending Orders</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.pendingOrders}
          </p>
        </div>
      </div>
    </section>
  );

  const renderProducts = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">🛍️ My Products</h2>
      <table className="w-full bg-white rounded-xl shadow table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Product Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td
                className={`px-4 py-2 ${
                  product.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.status}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
        + Add New Product
      </button>
    </section>
  );

  const renderOrders = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">📦 Orders</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.product}</td>
                <td className="px-4 py-2">{order.amount}</td>
                <td
                  className={`px-4 py-2 ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderPayments = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">💰 Payments</h2>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Current Balance:</span>
          <span className="text-2xl font-bold text-green-600">
            {payments.currentBalance}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Pending Amount:</span>
          <span className="text-xl font-semibold text-yellow-600">
            {payments.pendingAmount}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Last Payout:</span>
          <span className="text-gray-600">{payments.lastPayout}</span>
        </div>
        <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
          Request Payout
        </button>
      </div>
    </section>
  );

  const renderSupport = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">💬 Messages / Support</h2>
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Your Messages</h3>
        </div>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{message.from}</h4>
                  <p className="text-gray-600">{message.subject}</p>
                </div>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );

  const renderSettings = () => (
    <section>
      <h2 className="text-2xl font-semibold mb-4">⚙️ Settings</h2>
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                defaultValue="My Fashion Store"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                defaultValue="seller@example.com"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Business Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                defaultValue="123 Business Street, City, State"
              />
            </div>
          </div>
        </div>

        <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
          Save Changes
        </button>
      </div>
    </section>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "products":
        return renderProducts();
      case "orders":
        return renderOrders();
      case "payments":
        return renderPayments();
      case "support":
        return renderSupport();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed md:relative top-5 left-0 w-64 bg-white shadow-md p-6 h-157 transform transition-transform duration-300 ease-in-out z-20
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold text-purple-700 mb-6 text-center">
          Seller Panel
        </h2>
        <nav className="space-y-2">
          {[
            ["dashboard", "📊 Dashboard"],
            ["products", "🛍️ My Products"],
            ["orders", "📦 Orders"],
            ["payments", "💰 Payments"],
            ["support", "💬 Support"],
            ["settings", "⚙️ Settings"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                setSidebarOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md font-medium transition ${
                activeSection === key
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Hamburger Button for mobile */}
      <button
        className="md:hidden fixed top-24 left-4 z-30 bg-purple-600 text-white p-2 rounded-md shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-20  transition-all duration-300">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default SellerDashboard;
