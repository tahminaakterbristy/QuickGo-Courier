import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const AdminPanel = () => {
  const { logOut, user } = useContext(AuthContext); 
  const navigate = useNavigate(); 


  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

  return (
    <div className="flex bg-green-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <a href="/dashboard/manage-users" className="text-lg hover:text-green-400">
              Manage Users
            </a>
          </li>
          <li>
            <a href="/dashboard/all-posts" className="text-lg hover:text-green-400">
              All Posts
            </a>
          </li>
          <li>
            <a href="/dashboard/settings" className="text-lg hover:text-green-400">
              Site Settings
            </a>
          </li>

          <li>
            {/* Checking if user is logged in */}
            {user ? (
              <button
                onClick={handleSignOut}
                className="btn btn-sm bg-gradient-to-r from-green-400 to-green-700 text-white border-none hover:scale-105 transition"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="w-full">
                <button className="btn btn-success btn-sm w-full text-white">Log In</button>
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
