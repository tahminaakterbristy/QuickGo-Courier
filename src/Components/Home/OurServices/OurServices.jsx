import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OurServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://quickgoo1.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  // Directional animation based on index
  const getInitialPosition = (index) => {
    const directions = [
      { x: -100, y: 0 },  
      { x: 100, y: 0 },     
      { x: 0, y: -100 },  
      { x: 0, y: 100 },    
      { x: -100, y: -100 }, 
      { x: 100, y: 100 },  
    ];
    return directions[index % directions.length]; // cyclic
  };

  return (
    <div className="py-20 px-6 md:px-20 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => {
          const initial = getInitialPosition(index);

          return (
            <motion.div
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ x: initial.x, y: initial.y, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => navigate(service.route)}
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OurServices;
