import axios from 'axios';
import { useState } from 'react';
import { FaMapMarkerAlt, FaTruck, FaFlagCheckered } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Coverage = () => {
  const [pickup, setPickup] = useState('');
  const [delivery, setDelivery] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkCoverage = async () => {
    if (!pickup || !delivery || !dropoff) {
      toast.error("⚠️ Please fill all the fields!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get('https://quickgoo1.vercel.app/check-coverage', {
        params: { pickup, delivery, dropoff }
      });

      const { pickupStatus, deliveryStatus, dropoffStatus } = res.data;
      console.log("API Response:", res.data);
      const normalizedResponse = {
        pickupStatus: pickupStatus?.toLowerCase(),
        deliveryStatus: deliveryStatus?.toLowerCase(),
        dropoffStatus: dropoffStatus?.toLowerCase(),
      };

      setResponse(normalizedResponse);
      setError(null);

      const uncoveredAreas = [];

      if (normalizedResponse.pickupStatus !== 'covered') uncoveredAreas.push('Pickup');
      if (normalizedResponse.deliveryStatus !== 'covered') uncoveredAreas.push('Delivery');
      if (normalizedResponse.dropoffStatus !== 'covered') uncoveredAreas.push('Dropoff');

      if (uncoveredAreas.length === 0) {
        toast.success("✅ All locations are under coverage");
      } else {
        toast.warn(`⚠️ ${uncoveredAreas.join(', ')} location(s) not covered`);
      }

    } catch (err) {
      setError("An error occurred while fetching coverage data.");
      setResponse(null);
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (status, label) => {
    const isCovered = status === 'covered';
    return (
      <p className={`flex items-center gap-2 ${isCovered ? 'text-green-600' : 'text-red-600'}`}>
        {isCovered ? '✅' : '❌'} <span>{label}: {status}</span>
      </p>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-lg bg-green-50 mt-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-success">Check Coverage</h2>

      <div className="space-y-4">
        {/* Pickup */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <FaMapMarkerAlt /> Pickup Location
          </label>
          <input
            type="text"
            list="locations"
            className="input input-bordered w-full"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pickup location"
          />
        </div>

        {/* Delivery */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <FaTruck /> Delivery Location
          </label>
          <input
            type="text"
            list="locations"
            className="input input-bordered w-full"
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
            placeholder="Enter delivery location"
          />
        </div>

        {/* Dropoff */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <FaFlagCheckered /> Dropoff Location
          </label>
          <input
            type="text"
            list="locations"
            className="input input-bordered w-full"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="Enter dropoff location"
          />
        </div>

        <datalist id="locations">
          <option value="Dhaka Metro" />
          <option value="Chattogram" />
          <option value="Rajshahi" />
          <option value="Khulna" />
          <option value="Sylhet" />
          <option value="Barisal" />
          <option value="Rangpur" />
          <option value="Mymensingh" />
        </datalist>

        <button
          onClick={checkCoverage}
          className="btn btn-success w-full text-white"
        >
          Check Coverage
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-4">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}

      {/* Result */}
      {response && (
        <div className="mt-6 space-y-2 text-lg">
          {renderStatus(response.pickupStatus, "Pickup")}
          {renderStatus(response.deliveryStatus, "Delivery")}
          {renderStatus(response.dropoffStatus, "Dropoff")}
        </div>
      )}

      {/* Error */}
      {error && <div className="mt-4 text-red-500">{error}</div>}

      <ToastContainer />
    </div>
  );
};

export default Coverage;
