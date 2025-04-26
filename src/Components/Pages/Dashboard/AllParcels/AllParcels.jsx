import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaCheck, FaTrashAlt } from "react-icons/fa";

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParcels = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:6077/admin/parcels", {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch parcels");
        }

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

  // Approve parcel
  const handleApprove = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:6077/parcels/approve/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const updatedParcels = parcels.map((parcel) =>
          parcel._id === id ? { ...parcel, status: "Approved" } : parcel
        );
        setParcels(updatedParcels);
        Swal.fire({
          icon: "success",
          title: "Parcel approved!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Failed to approve parcel");
      }
    } catch (error) {
      console.error("Error approving parcel:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to approve parcel.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete parcel
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:6077/parcels/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const remainingParcels = parcels.filter((parcel) => parcel._id !== id);
        setParcels(remainingParcels);
        Swal.fire({
          icon: "success",
          title: "Parcel deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Failed to delete parcel");
      }
    } catch (error) {
      console.error("Error deleting parcel:", error);
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
    <div>
      <h2 className="text-2xl font-bold mb-4">All Parcels</h2>

      {loading && <div className="text-center py-4">Loading...</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Parcel Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="py-2 px-4 border-b">{parcel.name}</td>
                <td className="py-2 px-4 border-b">
                  {parcel.status === "Approved" ? (
                    <span className="text-green-500 font-semibold">Approved</span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">Pending</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {parcel.status !== "Approved" && (
                    <button
                      className="text-green-500 hover:text-green-700 mr-2"
                      onClick={() => handleApprove(parcel._id)}
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(parcel._id)}
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcels;
