import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import image1 from '../../../../public/assets/Logistics-bro.png'

// Text & Image Variants for Framer Motion
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
  // Set up visibility trigger for the banner using the Intersection Observer
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the count once when it comes into view
    threshold: 0.2, // When 20% of the banner comes into view
  });

  return (
    <div
      className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-r from-green-100 via-white to-green-50 px-6 md:px-20 py-16 gap-10 overflow-hidden"
      ref={ref} // Attach the ref here for visibility detection
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
          {/* Live counting only when it's in view */}
          <CountUp
            start={0}
            end={inView ? 10000 : 0} // Starts counting when it's in view
            duration={3}
            separator=","
            redraw={true} // Redraws the count if it's in view again
          />{" "}
          + users
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Fast & Reliable <span className="text-green-600">Delivery</span> 🚚
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Get your parcels delivered anywhere in Bangladesh within 24 hours. Trackable. Safe. Affordable.
        </p>
        <Link to="/get-started">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
            Get Started
          </button>
        </Link>
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
  );
};

export default Banner;
