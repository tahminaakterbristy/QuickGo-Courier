import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react"; 

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/dashboard/manage-users", label: "Manage Users" },
    { path: "/dashboard/all-parcels", label: "All Parcels" },
    { path: "/dashboard/settings", label: "Parcel Graph" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-green-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gradient-to-b from-green-700 to-green-900 text-white p-6 space-y-6 transition-all duration-300 z-10`}
      >
        <h2 className="text-2xl font-extrabold mb-4">Admin Panel</h2>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block text-lg px-3 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-green-500 text-white font-semibold"
                      : "hover:bg-green-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
