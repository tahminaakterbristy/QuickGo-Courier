import { useState, useEffect } from "react";
import { FaUserPlus, FaUserTimes, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from the server
  useEffect(() => {
    setLoading(true); // Set loading to true when starting fetch
    fetch("https://quickgoo1.vercel.app/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Expected an array of users, but got:", data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  }, []);

  const handleMakeAdmin = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://quickgoo1.vercel.app/users/admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedUsers = await response.json();
        setUsers(updatedUsers);
        Swal.fire({
          icon: "success",
          title: "User promoted to Admin!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Failed to make admin");
      }
    } catch (error) {
      console.error("Error making admin:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to promote user to admin.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://quickgoo1.vercel.app/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "User deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete user.",
      });
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      const response = await fetch(`https://quickgoo1.vercel.app/users/remove-admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove admin");
      }

      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Admin role removed!",
        showConfirmButton: false,
        timer: 1500,
      });

      setUsers(
        users.map((user) => (user._id === id ? { ...user, role: "user" } : user))
      );
    } catch (error) {
      console.error("Error removing admin:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to remove admin.",
      });
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      Manage Users
    </h2>
  
    {loading ? (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    ) : (
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-gray-100 transition">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4 flex gap-3 justify-center">
                  {user.role !== "admin" && (
                    <button
                      title="Make Admin"
                      className="text-green-600 hover:text-green-800 transition"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      <FaUserPlus size={18} />
                    </button>
                  )}
                  {user.role === "admin" && (
                    <button
                      title="Remove Admin"
                      className="text-yellow-600 hover:text-yellow-800 transition"
                      onClick={() => handleRemoveAdmin(user._id)}
                    >
                      <FaUserTimes size={18} />
                    </button>
                  )}
                  <button
                    title="Delete User"
                    className="text-red-600 hover:text-red-800 transition"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  
  );
};

export default ManageUsers;
