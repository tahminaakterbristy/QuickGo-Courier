import { Outlet } from "react-router-dom";


const AdminPanel = () => {
  return (
    <div className="flex">
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
