import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut().then(() => {}).catch(() => {});
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className="nav-link">Home</NavLink></li>

      <li><NavLink to="/coverage" className="nav-link">Coverage Area</NavLink></li>
      <li><NavLink to="/register" className="nav-link">Join Us As Merchant</NavLink></li>
      <li><NavLink to="/add-parcel" className="nav-link">Add A Parcel</NavLink></li>
      <li><NavLink to="/my-percels" className="nav-link">My Parcels</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md px-5 md:px-10 py-4 fixed top-0 left-0 right-0 z-50">
      {/* Mobile View */}
      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[50] p-4 shadow-lg bg-white text-gray-800 rounded-xl w-64 space-y-3">
            {navLinks}
            {user ? (
              <div className="mt-4 flex flex-col items-center gap-2 border-t pt-4">
                <img src={user.photoURL} alt="User"
                  className="w-10 h-10 rounded-full border-2 border-green-600" />
                <p className="text-sm font-semibold">{user.displayName}</p>
                <button onClick={handleSignOut}
                  className="btn btn-sm bg-gradient-to-r from-green-400 to-green-700 text-white border-none hover:scale-105 transition">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="w-full">
                <button className="btn btn-success btn-sm w-full text-white">Log In</button>
              </Link>
            )}
          </ul>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex flex-1 items-center justify-between w-full">
       
        <div className="flex items-center gap-10">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
            Quick<span className="text-green-400">Goo</span>
          </Link>
          <ul className="menu menu-horizontal gap-5 text-[16px] font-medium">
            {navLinks}
          </ul>
        </div>

        {/* Right Section - User Info */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative group">
                <Link to="/update-profile">
                <img src={user.photoURL} alt="User"
                  className="w-10 h-10 rounded-full border-2 border-green-500 group-hover:scale-105 transition" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-[1px] rounded-full shadow">✓</span>
                </Link>
              </div>
              <div className="flex flex-col text-end">
              
               <p className="text-sm font-semibold">{user.displayName}</p>
                <button onClick={handleSignOut}
                  className="btn btn-sm bg-gradient-to-r from-green-400 to-green-700 text-white border-none hover:scale-105 transition">
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
