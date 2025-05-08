import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceDetails = () => {
  const { serviceName } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://quickgoo1.vercel.app/services/route/${serviceName}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceName]);

  if (!service) {
    return <div className="text-center text-red-500 mt-10">Service not found!</div>;
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {service.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{service.description}</p>

          <button
            onClick={() => navigate("/our-plans")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            See Our Pricing
          </button>
        </motion.div>

        <motion.img
          src={service.icon}
          alt={service.title}
          className="w-[200px] md:w-[250px]"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      </div>

      {/* Benefits / Highlights Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-green-50 via-white to-green-100 mt-12 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Why Choose {service.title}?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
          <li>✔️ On-time delivery guaranteed</li>
          <li>✔️ Nationwide coverage</li>
          <li>✔️ Real-time tracking system</li>
          <li>✔️ Safe and secure parcel handling</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ServiceDetails;
