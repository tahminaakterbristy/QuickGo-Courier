import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet-async';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#a4de6c'];

const AdminParcel = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://quickgoo1.vercel.app/parcels/admin/parcel-status', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const result = res.data;
        const chartData = [
          { name: 'Total', count: result.total },
          { name: 'Approved', count: result.approved },
          { name: 'Pending', count: result?.pending ?? 0 },
          { name: 'Delivered', count: result.delivered },
        ];
        setData(chartData);
        setSummary(result);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        if (err.response?.status === 403) {
          setError('Access Forbidden: You do not have permission to view this data.');
          window.location.href = '/login';
        } else {
          setError('An error occurred while fetching parcel status.');
        }
      });
  }, []);

  return (
    <div className="w-full p-4">
      <Helmet>
        <title>QuickGoo | Parcel Graph</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">Parcel Status Overview</h2>

      {/* Summary Cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} height={100} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-xl text-center">
            <h3 className="text-lg font-semibold">Total</h3>
            <p className="text-2xl text-blue-600">{summary.total}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl text-center">
            <h3 className="text-lg font-semibold">Approved</h3>
            <p className="text-2xl text-green-600">{summary.approved}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl text-center">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-2xl text-yellow-600">{summary.pending}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl text-center">
            <h3 className="text-lg font-semibold">Delivered</h3>
            <p className="text-2xl text-purple-600">{summary.delivered}</p>
          </div>
        </div>
      )}

      {/* Pie Chart */}
      <div className="w-full h-[400px]">
        {loading ? (
          <Skeleton height={400} />
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminParcel;
