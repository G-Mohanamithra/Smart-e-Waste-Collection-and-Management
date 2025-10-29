// src/pages/Submission.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Submission = () => {
  const [formData, setFormData] = useState({
    deviceType: "Laptop",
    quantity: 1,
    brand: "",
    model: "",
    deviceCondition: "Working",
    pickupAddress: "",
    remarks: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const addressRef = useRef(null);

  const DEVICE_TYPES = ["Laptop", "Mobile", "TV", "Printer", "Other"];
  const CONDITIONS = ["Working", "Damaged", "Dead"];

  useEffect(() => {
    // Load Google Places Autocomplete
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressRef.current,
        { types: ["geocode"], componentRestrictions: { country: "in" } }
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setFormData((prev) => ({
          ...prev,
          pickupAddress: place.formatted_address || "",
        }));
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setImageFile(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: name === "quantity" ? parseInt(value) : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting request...");

    const formPayload = new FormData();
    const jsonBlob = new Blob([JSON.stringify(formData)], {
      type: "application/json",
    });
    formPayload.append("data", jsonBlob);
    if (imageFile) formPayload.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/requests/submit",
        formPayload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(`✅ Request Submitted! ID: ${response.data.id}`);
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Network Error";
      setMessage(`❌ Submission Failed: ${msg}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-teal-100 p-6">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-green-200">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          🌱 E-Waste Collection Request
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          encType="multipart/form-data"
        >
          {/* Device Type & Condition */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-800 font-semibold mb-1">
                Device Type
              </label>
              <select
                name="deviceType"
                value={formData.deviceType}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                {DEVICE_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-green-800 font-semibold mb-1">
                Condition
              </label>
              <select
                name="deviceCondition"
                value={formData.deviceCondition}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                {CONDITIONS.map((cond) => (
                  <option key={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Brand / Model / Quantity */}
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              onChange={handleChange}
              className="border border-green-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 w-full"
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              onChange={handleChange}
              className="border border-green-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 w-full"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              min="1"
              onChange={handleChange}
              className="border border-green-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 w-full"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-green-800 font-semibold mb-1">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Google Location Input */}
          <div>
            <label className="block text-green-800 font-semibold mb-1">
              Pickup Address (with Google Autocomplete)
            </label>
            <input
              type="text"
              ref={addressRef}
              name="pickupAddress"
              placeholder="Start typing your address..."
              value={formData.pickupAddress}
              onChange={handleChange}
              className="border border-green-300 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-green-800 font-semibold mb-1">
              Additional Remarks
            </label>
            <textarea
              name="remarks"
              onChange={handleChange}
              rows="3"
              className="border border-green-300 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md"
          >
            Submit Request
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-700" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Submission;
