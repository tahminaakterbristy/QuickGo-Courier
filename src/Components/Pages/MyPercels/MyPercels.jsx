import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MyPercels = () => {
  const [parcels, setParcels] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchParcels = async () => {
    const res = await axios.get(`https://quickgoo1.vercel.app/parcels?email=${user.email}`);
    setParcels(res.data);
  };

  useEffect(() => {
    if (user?.email) fetchParcels();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this parcel?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      await axios.delete(`https://quickgoo1.vercel.app/parcels/${id}`);
      fetchParcels();
      Swal.fire('Deleted!', 'Parcel has been deleted.', 'success');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <Helmet>
        <title>QuickGoo | My Parcels</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">My Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-base-100 rounded-lg shadow-md">
          <thead className="bg-green-400">
            <tr>
              <th className="text-sm font-semibold text-white">Name</th>
              <th className="text-sm font-semibold text-white">Phone</th>
              <th className="text-sm font-semibold text-white">Address</th>
              <th className="text-sm font-semibold text-white">Weight</th>
              <th className="text-sm font-semibold text-white">TrackingCode</th>
              <th className="text-sm font-semibold text-white">Status</th>
              <th className="text-sm font-semibold text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50 transition duration-200 bg-green-50 border-gray-300">
                <td className="text-sm font-medium">{parcel.name}</td>
                <td className="text-sm font-medium">{parcel.phone}</td>
                <td className="text-sm font-medium">{parcel.address}</td>
                <td className="text-sm font-medium">{parcel.weight} kg</td>
                <td className="text-sm font-medium">{parcel.trackingCode}</td>
                <td className="text-sm font-medium">
                  <div className="tooltip tooltip-top" data-tip={parcel.status === "Delivered" ? "Your parcel is delivered" : "Hasn't delivered yet"}>
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${parcel.status === "Approved" ? "bg-green-600" : parcel.status === "Delivered" ? "bg-green-600" : "bg-gray-500"}`}>
                      {parcel.status || "Pending"}
                    </span>
                  </div>
                </td>
                <td className="space-x-2 flex justify-center items-center">
  {parcel.status !== "Delivered" && parcel.status !== "Approved" && (
    <button 
      className="btn btn-sm bg-red-400 text-white hover:bg-red-500 transition-all duration-300"
      onClick={() => handleDelete(parcel._id)}
    >
      Delete
    </button>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPercels;
