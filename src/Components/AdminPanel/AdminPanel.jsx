import { useEffect, useState } from "react";
import axiosSecure from "./axiosSecure";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get('/users')
      .then(res => {
        console.log(res.data); 
        setUsers(res.data);
      })
      .catch(error => {
        console.error("Error fetching users", error);
      });
  }, []);

  const makeAdmin = (id) => {
    axiosSecure.patch(`/users/admin/${id}`).then(() => {
      alert("Admin created!");
      // Refresh the users list after making admin
      axiosSecure.get("/users").then((res) => setUsers(res.data));
    });
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axiosSecure.delete(`/users/${id}`).then(() => {
        alert("User deleted!");
        // Refresh the users list after deleting
        axiosSecure.get("/users").then((res) => setUsers(res.data));
      });
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name || "No Name"}</td>
              <td>{u.email}</td>
              <td>
                {u.role !== "admin" && (
                  <button onClick={() => makeAdmin(u._id)}>Make Admin</button>
                )}
                <button onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
