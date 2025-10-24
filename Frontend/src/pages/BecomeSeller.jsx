import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Simple Modal component
const Modal = ({ title, message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        OK
      </button>
    </div>
  </div>
);

const BecomeSeller = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    // panNumber: "",
    // gstNumber: "",
    businessName: "",
    businessType: "",
    yearsInBusiness: "",
    address: "",
    pinCode: "",
    // productCategories: [],
    description: "",
    // productImages: [],
    // idProof: null,
    // businessProof: null,
    // bankName: "",
    // accountNumber: "",
    // ifscCode: "",
    acceptTerms: false,
  });

  const { user } = useAuth();

  // Validation rules
  const validationRules = {
    1: () => {
      const newErrors = {};
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone number must be 10 digits";
      // if (!formData.panNumber.trim()) newErrors.panNumber = "PAN is required";
      // if (!formData.gstNumber.trim()) newErrors.gstNumber = "GST is required";
      if (!formData.password.trim())
        newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";

      return newErrors;
    },
    2: () => {
      const newErrors = {};
      if (!formData.businessName.trim())
        newErrors.businessName = "Business name is required";
      if (!formData.businessType)
        newErrors.businessType = "Business type is required";
      if (!formData.yearsInBusiness)
        newErrors.yearsInBusiness = "Years in business is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.pinCode.trim()) newErrors.pinCode = "PIN code is required";
      else if (!/^\d{6}$/.test(formData.pinCode))
        newErrors.pinCode = "PIN code must be 6 digits";
      return newErrors;
    },
    3: () => {
      const newErrors = {};
      // if (formData.productCategories.length === 0)
      //   newErrors.productCategories = "Select at least one product category";
      if (!formData.description.trim())
        newErrors.description = "Business description is required";
      else if (formData.description.trim().length < 50)
        newErrors.description = "Description must be at least 50 characters";
      // if (formData.productImages.length === 0) newErrors.productImages = "Upload at least one product image";
      return newErrors;
    },
    4: () => ({}), // Skipped
    5: () => ({}), // Skipped
    6: () => {
      const newErrors = {};
      if (!formData.acceptTerms)
        newErrors.acceptTerms = "You must accept the terms and conditions";
      return newErrors;
    },
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (step) => {
    const stepErrors = validationRules[step]();
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      // Skip steps 4 & 5
      if (currentStep === 3) setCurrentStep(6);
      else setCurrentStep((prev) => prev + 1);
    }
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    if (currentStep === 6) setCurrentStep(3); // Back from 6 to 3
    else setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(6)) {
      setShowModal(true);
      console.log("Form submitted:", formData);
    }
  };

  useEffect(() => {
    if (user && !formData.fullName) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const progressPercentage = (currentStep / 6) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of 6
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gold h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Become a Seller
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Join our community of women entrepreneurs and grow your business
          </p>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["fullName", "email", "password", "phone"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field === "fullName"
                          ? "Full Name *"
                          : field === "email"
                          ? "Email *"
                          : field === "password"
                          ? "Password *"
                          : "Phone *"}
                      </label>
                      <input
                        type={
                          field === "email"
                            ? "email"
                            : field === "password"
                            ? "password"
                            : "text"
                        }
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleInputChange}
                        placeholder={errors[field] || ""}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                          errors[field]
                            ? "border-red-500 placeholder-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-dark"
                  >
                    Next: Business Info
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Business Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Business Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "businessName",
                    "businessType",
                    "yearsInBusiness",
                    "address",
                    "pinCode",
                  ].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field === "businessName"
                          ? "Business Name *"
                          : field === "businessType"
                          ? "Business Type *"
                          : field === "yearsInBusiness"
                          ? "Years in Business *"
                          : field === "address"
                          ? "Business Address *"
                          : "PIN Code *"}
                      </label>
                      {field === "businessType" ? (
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                            errors.businessType
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Type</option>
                          <option value="food">Food & Beverages</option>
                          <option value="fashion">Fashion & Apparel</option>
                          <option value="handicrafts">Handicrafts</option>
                          <option value="beauty">Beauty & Wellness</option>
                          <option value="home">Home & Living</option>
                          <option value="other">Other</option>
                        </select>
                      ) : field === "yearsInBusiness" ? (
                        <select
                          name="yearsInBusiness"
                          value={formData.yearsInBusiness}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                            errors.yearsInBusiness
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Experience</option>
                          <option value="0-1">Less than 1 year</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          placeholder={errors[field] || ""}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                            errors[field]
                              ? "border-red-500 placeholder-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gold text-black px-8 py-3 rounded-lg hover:bg-gold-dark"
                  >
                    Next: Product Info
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Product Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Product Information
                </h2>
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business/Product Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder={
                      errors.description ||
                      "Tell us about your business and products..."
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                      errors.description
                        ? "border-red-500 placeholder-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.description.length}/50 characters minimum
                  </p>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gold text-black px-8 py-3 rounded-lg hover:bg-gold-dark"
                  >
                    Next: Terms & Conditions
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Terms & Conditions */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Terms & Conditions
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg max-h-60 overflow-y-auto">
                  <h3 className="font-semibold mb-4">Seller Agreement</h3>
                  <div className="text-sm text-gray-600 space-y-3">
                    <p>
                      1. Provide accurate and complete information about your
                      business and products.
                    </p>
                    <p>
                      2. Responsible for quality and authenticity of products
                      listed.
                    </p>
                    <p>
                      3. Maintain fair pricing and transparent business
                      practices.
                    </p>
                    <p>
                      4. Platform commission of 10% applicable on all successful
                      sales.
                    </p>
                    <p>
                      5. Commit to timely order processing and customer service.
                    </p>
                    <p>
                      6. Violation of terms may result in account suspension or
                      termination.
                    </p>
                    <p>
                      7. Retain ownership of products while granting platform
                      the right to display and market them.
                    </p>
                    <p>
                      8. Payments processed within 7-10 business days after
                      order completion.
                    </p>
                  </div>
                </div>

                <label className="flex items-center space-x-3 mt-4">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className={`rounded border-gray-300 text-gold focus:ring-gold ${
                      errors.acceptTerms ? "border-red-500" : ""
                    }`}
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the Terms & Conditions and Seller
                    Agreement *
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.acceptTerms}
                  </p>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          title="CONGRATULATIONS!"
          message="Your Seller Account has been created."
          onClose={() => {
            setShowModal(false);
            navigate("/seller-account");
          }}
        />
      )}
    </div>
  );
};

export default BecomeSeller;
