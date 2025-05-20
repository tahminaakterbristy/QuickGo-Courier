import { motion } from "framer-motion";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import image1 from '../../../../public/assets/Logistics-bro.png'
import { useState } from "react";

// Framer Motion Variants
const textVariant = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const imageVariant = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const Banner = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
    <div className="bg-gradient-to-r from-green-100 via-white to-green-50 py-16 px-6 md:px-20 overflow-hidden">
      {/* Main Banner */}
      <div
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-10"
        ref={ref}
      >
        {/* Text Section */}
        <motion.div
          className="text-center md:text-left max-w-xl"
          variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          <p className="text-3xl text-green-600 font-semibold uppercase mb-2 tracking-wider">
            Trusted by{" "}
            <CountUp
              start={0}
              end={inView ? 10000 : 0}
              duration={3}
              separator=","
              redraw={true}
            />{" "}
            + users
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Fast & Reliable <span className="text-green-600">Delivery</span> 🚚
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Get your parcels delivered anywhere in Bangladesh within 24 hours.
            Trackable. Safe. Affordable.
          </p>

          {/* tracking input */}
         
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
         <div className="mt-6 p-4 bg-white rounded-lg shadow text-left max-w-md mx-auto">
           <h3 className="text-lg font-semibold text-green-700">
             Tracking Info
           </h3>
           <p>
             <span className="font-semibold">Status:</span>{" "}
             {parcelInfo.status}
           </p>
           <p>
             <span className="font-semibold">Location:</span>{" "}
             {parcelInfo.adress}
           </p>
         </div>
       )}
    
        </motion.div>

        {/* Image Section */}
        <motion.img
          src={image1}
          alt="Delivery Illustration"
          className="w-full max-w-sm md:max-w-md object-contain"
          variants={imageVariant}
          initial="hidden"
          animate="visible"
        />
      </div>

      {/* Tracking Section */}
    
    </div>
  );
};

export default Banner;
