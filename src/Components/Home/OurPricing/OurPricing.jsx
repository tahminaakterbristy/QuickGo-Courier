import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";

const OurPricing = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // For Modal
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("./pricing.json")
      .then((res) => res.json())
      .then((data) => setPackages(data));
  }, []);


//   fetch("https://your-api-url.com/api/pricing")
//   .then((res) => res.json())  mongodb url
//   .then((data) => setPackages(data));


  // Filter packages based on selection
  const filteredPackages = packages.filter((pkg) =>
    filter === "All" ? true : pkg.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="py-20 px-6 md:px-20 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Our Pricing Plans
      </h2>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          className="px-4 py-2 border rounded-md"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Plans</option>
          <option value="Express">Express Delivery</option>
          <option value="Regular">Regular Delivery</option>
          <option value="Economy">Economy Delivery</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedPackage(pkg)} // Open modal on card click
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{pkg.title}</h3>
              <p className="text-lg text-gray-500 mb-4">{pkg.description}</p>
              <span className="text-4xl font-bold text-green-600">${pkg.price}</span>
              <p className="text-gray-600 text-sm mt-2">{pkg.duration}</p>
            </div>

            <div className="border-t pt-4">
              <ul className="list-none text-left">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 text-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 text-center">
              <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition">
                Select Plan
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Select Plan */}
      {selectedPackage && (
        <Dialog open={selectedPackage !== null} onClose={() => setSelectedPackage(null)}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-96">
              <Dialog.Title className="text-2xl font-bold text-gray-800 mb-4">
                {selectedPackage.title}
              </Dialog.Title>
              <p className="text-lg text-gray-500 mb-4">{selectedPackage.description}</p>
              <span className="text-4xl font-bold text-green-600">${selectedPackage.price}</span>
              <p className="text-gray-600 text-sm mt-2">{selectedPackage.duration}</p>
              <div className="mt-6 text-center">
                <button
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
                  onClick={() => navigate("/checkout")} // Example route for checkout
                >
                  Proceed to Checkout
                </button>
                <button
                  className="mt-4 text-red-600"
                  onClick={() => setSelectedPackage(null)} // Close Modal
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog>
      )}
    </div>
  );
};

export default OurPricing;
