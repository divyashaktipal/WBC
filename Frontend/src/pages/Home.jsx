import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";

const Home = () => {
  // Product data
  const products = [
    {
      id: 1,
      name: "Modern Comfort Sofa",
      description: "Luxury 3-seater with premium fabric upholstery",
      price: 35999,
      originalPrice: 44999,
      image: "/soap.jpg",
      tag: { text: "Popular", color: "bg-yellow-500" },
    },
    {
      id: 2,
      name: "Elegant Dining Set",
      description: "6-seater wooden dining set with cushioned chairs",
      price: 42999,
      originalPrice: 54999,
      image: "/deepak.jpg",
      tag: { text: "New", color: "bg-green-500" },
    },
    {
      id: 3,
      name: "Modern Study Desk",
      description: "Compact desk with storage and cable management",
      price: 12999,
      originalPrice: 21999,
      image: "/cake.jpg",
      tag: { text: "-40%", color: "bg-blue-500" },
    },
    {
      id: 4,
      name: "Wooden Bedside Table",
      description: "Contemporary design with drawer and open shelf",
      price: 8999,
      originalPrice: 11999,
      image: "/face-kit.jpg",
      tag: { text: "New", color: "bg-green-500" },
    },
    {
      id: 5,
      name: "Wooden Bedside Table",
      description: "Contemporary design with drawer and open shelf",
      price: 8999,
      originalPrice: 11999,
      image: "/face-kit.jpg",
      tag: { text: "New", color: "bg-green-500" },
    },
    {
      id: 6,
      name: "Wooden Bedside Table",
      description: "Contemporary design with drawer and open shelf",
      price: 8999,
      originalPrice: 11999,
      image: "/face-kit.jpg",
      tag: { text: "New", color: "bg-green-500" },
    },
    {
      id: 7,
      name: "Wooden Bedside Table",
      description: "Contemporary design with drawer and open shelf",
      price: 8999,
      originalPrice: 11999,
      image: "/face-kit.jpg",
      tag: { text: "New", color: "bg-green-500" },
    },
    {
      id: 8,
      name: "Wooden Bedside Table",
      description: "Contemporary design with drawer and open shelf",
      price: 8999,
      originalPrice: 11999,
      image: "/face-kit.jpg",
      tag: { text: "New", color: "bg-green-500" },
    },
  ];

  // State for product counts
  const [productCounts, setProductCounts] = useState(Array(4).fill(0));

  // Update count function
  const updateCount = (productId, count) => {
    const newCounts = [...productCounts];
    newCounts[productId - 1] = count;
    setProductCounts(newCounts);
  };

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center bg-gray-50">
        {/* Main Image */}
        <div className="w-full h-full md:absolute left-0 top-0">
          <img
            src="../public/img1.jpg"
            alt="Living room interior with plant and rattan chair"
            className="w-full h-[40vh] md:h-[80vh] object-cover"
          />
        </div>

        {/* Content Card */}
        <div
          className="w-[90%] md:w-[40%] lg:w-[35%] bg-[#FFF9F0] p-6 md:p-8 lg:p-12 rounded-lg shadow-lg 
                      mx-4 md:mr-8 lg:mr-12 md:ml-auto -mt-8 md:mt-0 relative"
        >
          <div className="mb-3 md:mb-4">
            <span className="text-sm uppercase tracking-wider text-[#B8860B]">
              New Arrival
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 md:mb-6 text-[#B8860B]">
            Discover Our
            <br />
            New Collection
          </h1>

          <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>

          <button className="w-full md:w-auto bg-[#B8860B] text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-[#966F33] transition-colors duration-300">
            BUY NOW
          </button>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-center text-xl md:text-2xl text-gray-600 mb-8 md:mb-12">
            TRUSTED BY OVER 1K+ SELLERS
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-70">
            {/* Company Logos */}
            <img
              src="../public/amazon.png"
              alt="Amazon"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="../public/etsy.png"
              alt="Etsy"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="../public/shopify.png"
              alt="Shopify"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="../public/ebay.png"
              alt="eBay"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="../public/alibaba.png"
              alt="Alibaba"
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Browse The Range Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop By Category
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Dining Card */}
            <div className="group cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src="/BrowseImg1.jpg"
                  alt="Dining room furniture"
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800">
                Dining
              </h3>
            </div>

            {/* Living Card */}
            <div className="group cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src="/BrowseImg2.jpg"
                  alt="Living room furniture"
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800">
                Living
              </h3>
            </div>

            {/* Bedroom Card */}
            <div className="group cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src="/BrowseImg3.jpg"
                  alt="Bedroom furniture"
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800">
                Bedroom
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                  {productCounts[product.id - 1] > 0 && (
                    <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCount(
                            product.id,
                            Math.max(0, productCounts[product.id - 1] - 1)
                          )
                        }
                        className="p-1"
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      <span className="w-8 text-center">
                        {productCounts[product.id - 1]}
                      </span>
                      <button
                        onClick={() =>
                          updateCount(
                            product.id,
                            productCounts[product.id - 1] + 1
                          )
                        }
                        className="p-1"
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>
                  )}
                  <div
                    className={`absolute top-4 left-4 ${product.tag.color} text-white text-sm px-2 py-1 rounded`}
                  >
                    {product.tag.text}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    {productCounts[product.id - 1] === 0 && (
                      <button
                        onClick={() => updateCount(product.id, 1)}
                        className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
                      >
                        <FaShoppingCart />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Networking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with like-minded women entrepreneurs and build lasting
                business relationships.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Mentorship
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get guidance from experienced business leaders and share your
                knowledge with others.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Growth
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access resources, workshops, and opportunities to scale your
                business.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
