import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard/manage-users", label: "Manage Users" },
    { path: "/dashboard/all-parcels", label: "All Parcels" },
    { path: "/dashboard/settings", label: "Parcel Graph" },
  ];

  const handleSignOut = () => {
    logOut()
      .then(() => setSignedOut(true))
      .catch((error) => console.error("Error during sign out:", error));
  };

  useEffect(() => {
    if (signedOut) {
      navigate("/");
    }
  }, [signedOut, navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">

      {/* Mobile Header */}
      <div className="md:hidden bg-green-300 text-white p-4 flex justify-between items-center z-20">
        {/* <h2 className="text-xl font-bold">Admin Panel</h2> */}
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto md:min-h-screen 
          w-64 bg-gradient-to-b from-green-200 to-green-300 p-6 z-20
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          transition-transform duration-300 ease-in-out
          flex flex-col justify-between
        `}
      >
        {/* Sidebar Header (Mobile) */}
        <div>
          <div className="md:hidden flex justify-between items-center mb-4">
        
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <ul className="space-y-4 border-b border-green-500 font-bold  pb-4 mb-4">
          <h2 className="text-2xl font-extrabold">Admin Panel</h2>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg px-3 py-2 rounded-lg transition duration-200 ${
                      isActive
                        ? "bg-green-400 text-white font-semibold"
                        : "hover:bg-green-500"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section: Sign Out / In */}
        <div className="relative min-h-[150px]" >
          {signedOut ? (
            <div className="absolute pb-28 left-0 right-0 px-4 space-y-2">
              <button
                className="btn btn-success w-full"
                onClick={() => {
                  setSignedOut(false);
                  navigate("/");
                  setIsOpen(false);
                }}
              >
                Go to Home
              </button>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="btn btn-outline btn-success w-full">
                  Sign In
                </button>
              </Link>
            </div>
          ) : user ? (
            <button
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
              className="btn btn-sm w-full bg-green-600 hover:bg-green-700 text-white font-semibold tracking-wide transition duration-200 shadow-md"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="btn btn-success btn-sm w-full text-white">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
