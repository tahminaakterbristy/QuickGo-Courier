import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

const AutoScrollTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:6077/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  // Function to auto scroll
  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % testimonials.length;
        const scrollPosition = nextIndex * 350; // Approx card width
        scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
        return nextIndex;
      });
    }, 1000);
  };

  useEffect(() => {
    if (testimonials.length) {
      startAutoScroll();
    }
    return () => clearInterval(intervalRef.current);
  }, [testimonials]);

  // Pause on hover
  const handleMouseEnter = () => clearInterval(intervalRef.current);
  const handleMouseLeave = () => startAutoScroll();

  return (
    <div className="bg-gray-50 py-20 px-4 md:px-20 text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        What Our Customers Say
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {testimonials.map((t, index) => (
          <div
            key={t.id}
            className={`min-w-[300px] md:min-w-[350px] bg-white rounded-xl shadow-md p-6 transition-all duration-300 ${
              activeIndex === index ? "scale-105 shadow-xl" : ""
            }`}
          >
            <div className="flex justify-center mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 rounded-full border-4 border-green-100"
              />
            </div>
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-500">{t.role} - {t.location}</p>
            <p className="mt-3 text-gray-600 text-sm italic">
              {t.testimonial}
            </p>
            <div className="flex justify-center text-yellow-400 mt-4">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === activeIndex ? "bg-green-500" : "bg-gray-300"
            } transition-all duration-300`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollTestimonial;
