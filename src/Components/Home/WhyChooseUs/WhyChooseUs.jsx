
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Card 1 */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
          initial={{ opacity: 0, x: -200 }} // initial position (off-screen left)
          animate={{ opacity: 1, x: 0 }} // final position (centered)
          transition={{ duration: 0.8 }} // animation duration
        >
          <div className="flex justify-center items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-16 h-16 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0v4m0 0l-4 2m4-2l4 2"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Fast Delivery</h3>
          <p className="text-gray-600 text-lg">
            We ensure your parcel reaches its destination within the shortest
            time possible. Same-day and next-day delivery options are available.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
          initial={{ opacity: 0, x: 200 }} // initial position (off-screen right)
          animate={{ opacity: 1, x: 0 }} // final position (centered)
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-16 h-16 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5v14l11-7-11-7z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Easy Tracking</h3>
          <p className="text-gray-600 text-lg">
            Track your parcel at any moment with our user-friendly tracking
            system. Stay updated with every step of the journey.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
          initial={{ opacity: 0, x: -200 }} // initial position (off-screen left)
          animate={{ opacity: 1, x: 0 }} // final position (centered)
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-16 h-16 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h-4m4 0h4m4-4h4M16 4h4m-4 0h-4m0 4H4m12 4H4m8 0V4h-4m0 12h4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Affordable Prices</h3>
          <p className="text-gray-600 text-lg">
            Get high-quality services at competitive prices. We provide cost-effective
            solutions for every delivery type.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
