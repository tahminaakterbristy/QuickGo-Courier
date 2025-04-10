import axios from "axios";
import { useEffect, useState } from "react";


const Coverage = () => {
  const [coverages, setCoverages] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("http://localhost:6077/coverages")
      .then(res => {
        // Check if res.data is an array before setting it
        if (Array.isArray(res.data)) {
          setCoverages(res.data);
        } else {
          console.error("Data is not an array:", res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching coverage data: ", err);
      });
  }, []);
  

  // Filter coverages based on search query
  const filtered = coverages.filter((zone) =>
    zone.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-50 py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        কভারেজ ও চার্জিং তথ্য
      </h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="এলাকা অনুসন্ধান করুন..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Search functionality
        />
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Loop through filtered coverages and display */}
        {filtered.map((zone, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              {zone.area}
              {zone.express && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-green-500 text-white rounded-full">
                  এক্সপ্রেস
                </span>
              )}
            </h3>
            <p className="text-gray-600 mt-2"><strong>সার্ভিস টাইপ:</strong> {zone.type}</p>
            <p className="text-gray-600"><strong>সময়:</strong> {zone.time}</p>
            <p className="text-gray-600"><strong>বেস চার্জ:</strong> ৳{zone.baseCharge}</p>

            <div className="mt-4">
              <p className="font-medium text-gray-700 mb-1">ওজন ভিত্তিক চার্জ:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>১ কেজি পর্যন্ত: +৳{zone.weightCharges["1kg"]}</li>
                <li>১-৩ কেজি: +৳{zone.weightCharges["3kg"]}</li>
                <li>৩ কেজির উপরে: +৳{zone.weightCharges["above3kg"]}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Coverage;
