import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaCheck, FaTrashAlt, FaTruck } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { Helmet } from "react-helmet-async";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentParcels = parcels.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const fetchParcels = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://quickgoo1.vercel.app/admin/parcels", {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch parcels");

        const data = await response.json();
        setParcels(data);
      } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Could not fetch parcels.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://quickgoo1.vercel.app/parcels/approve/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const updated = parcels.map((p) =>
          p._id === id ? { ...p, status: "Approved" } : p
        );
        setParcels(updated);
        Swal.fire({
          icon: "success",
          title: "Parcel approved!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to approve the parcel. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Approve error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to approve parcel.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelivered = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://quickgoo1.vercel.app/parcels/deliver/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const updated = parcels.map((p) =>
          p._id === id ? { ...p, status: "Delivered" } : p
        );
        setParcels(updated);
        Swal.fire({
          icon: "success",
          title: "Marked as Delivered!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Delivery error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to mark as delivered.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://quickgoo1.vercel.app/parcels/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setParcels(parcels.filter((p) => p._id !== id));
        Swal.fire({
          icon: "success",
          title: "Parcel deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete parcel.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Helmet>
              <title>QuickGoo | Parcel Management</title>
            </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6 text-success">All Parcels</h2>

      {loading && (
        <div className="flex justify-center py-8">
          <ImSpinner9 className="text-4xl animate-spin text-primary" />
        </div>
      )}

      {!loading && (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table w-full bg-base-100">
              <thead className="bg-success text-white text-lg">
                <tr>
                  <th className="py-3 px-5">Parcel Name</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentParcels.map((parcel) => {
                  const status = parcel.status?.toLowerCase();
                  return (
                    <tr key={parcel._id} className="hover:bg-base-200">
                      <td className="py-3 px-5 font-semibold">{parcel.name}</td>
                      <td className="py-3 px-5">
                        <span
                          className={`badge text-white ${
                            status === "approved"
                              ? "badge-success"
                              : status === "delivered"
                              ? "badge-info"
                              : "badge-warning"
                          }`}
                        >
                          {parcel.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 flex justify-center items-center space-x-2 flex-wrap">
                        {status === "pending" && (
                          <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => handleApprove(parcel._id)}
                          >
                            <FaCheck className="mr-1" /> Approve
                          </button>
                        )}

                        {status === "approved" && (
                          <button
                            className="btn btn-sm btn-info text-white"
                            onClick={() => handleDelivered(parcel._id)}
                          >
                            <FaTruck className="mr-1" /> Delivered
                          </button>
                        )}

                        {status !== "delivered" && (
                          <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => handleDelete(parcel._id)}
                          >
                            <FaTrashAlt className="mr-1" /> Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {parcels.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500">
                      No parcels found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(parcels.length / itemsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllParcels;
