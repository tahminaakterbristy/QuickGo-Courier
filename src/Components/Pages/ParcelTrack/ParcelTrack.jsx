import { useState } from "react";

const ParcelTrack= () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [parcelInfo, setParcelInfo] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingCode) return;

    try {
      const res = await fetch(
        `https://quickgoo1.vercel.app/parcels/track/${trackingCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Parcel not found");
        setParcelInfo(null);
      } else {
        setParcelInfo(data);
        setError("");
      }
    } catch (err) {
      setError("Server error");
      setParcelInfo(null);
    }
  };

  return (
    <div className="bg-green-100 py-10 px-4 text-center rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-green-800">
        Track Your Parcel
      </h2>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Enter Tracking Code"
          className="input input-bordered w-full max-w-xs"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
        />
        <button onClick={handleTrack} className="btn btn-success">
          Track Now
        </button>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {parcelInfo && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-left max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-green-700">Tracking Info</h3>
          <p><span className="font-semibold">Status:</span> {parcelInfo.status}</p>
         
          <p><span className="font-semibold">Location:</span> {parcelInfo.adress}</p>
          {/* <p><span className="font-semibold">Last Updated:</span> {new Date(parcelInfo.updatedAt).toLocaleString()}</p> */}
        </div>
      )}
    </div>
  );
};

export default ParcelTrack;
