// components/ParcelChart.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";



const ParcelChart = () => {
  const [chartData, setChartData] = useState([]);
//   const { user } = useContext(AuthContext); // Optional: if email needed

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await axios.get(`http://localhost:6077/parcels`);
        const parcels = res.data;

        // Group by month
        const monthlyCounts = {};
        parcels.forEach(parcel => {
          const month = format(new Date(parcel.createdAt), "MMM");
          monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        });

        // Format data for chart
        const result = Object.entries(monthlyCounts).map(([month, count]) => ({
          month,
          parcels: count,
        }));

        setChartData(result);
      } catch (error) {
        console.error("Error fetching parcel data:", error);
      }
    };

    fetchParcels();
  }, []);

  return (
    <div className="w-full h-96 bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Monthly Parcel Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="parcels" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParcelChart;
