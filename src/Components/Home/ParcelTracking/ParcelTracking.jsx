import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ParcelTracking = () => {
  const [parcelId, setParcelId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState("");

  const handleTracking = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tracking/${parcelId}`);
      setTrackingInfo(response.data);
      setError("");
    } catch (err) {
      setError("Parcel not found or invalid ID.");
      setTrackingInfo(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <motion.h1
        className="text-3xl font-semibold text-gray-800 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Track Your Parcel
      </motion.h1>
      <input
        type="text"
        placeholder="Enter Parcel ID"
        className="border px-4 py-2 rounded-lg mb-4"
        value={parcelId}
        onChange={(e) => setParcelId(e.target.value)}
      />
      <button
        onClick={handleTracking}
        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
      >
        Track
      </button>

      {error && (
        <motion.p
          className="text-red-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {error}
        </motion.p>
      )}

      {trackingInfo && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Tracking Information</h2>
          <p><strong>Status:</strong> {trackingInfo.status}</p>
          <p><strong>Location:</strong> {trackingInfo.location}</p>
          <p><strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}</p>
        </div>
      )}
    </div>
  );
};

export default ParcelTracking;
