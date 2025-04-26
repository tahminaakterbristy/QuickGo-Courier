import { useState, useEffect } from "react";
import { FaUserPlus, FaUserTimes, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from the server
  useEffect(() => {
    setLoading(true); // Set loading to true when starting fetch
    fetch("http://localhost:6077/users")
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
      const response = await fetch(`http://localhost:6077/users/admin/${id}`, {
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
      const response = await fetch(`http://localhost:6077/users/${id}`, {
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
      const response = await fetch(`http://localhost:6077/users/remove-admin/${id}`, {
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {loading && <div className="text-center py-4">Loading...</div>} {/* Loading indicator */}
      <table className="min-w-full bg-white border border-gray-300 table-auto sm:overflow-x-scroll sm:block">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                {user.role !== "admin" && (
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleMakeAdmin(user._id)}
                  >
                    <FaUserPlus />
                  </button>
                )}
                {user.role === "admin" && (
                  <button
                    className="text-red-500 hover:text-red-700 mr-2"
                    onClick={() => handleRemoveAdmin(user._id)}
                  >
                    <FaUserTimes />
                  </button>
                )}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
