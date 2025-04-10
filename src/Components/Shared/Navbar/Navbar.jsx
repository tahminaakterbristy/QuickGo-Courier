
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);

//   const handleSignOut = () => {
//     logOut()
//       .then(() => {})
//       .catch(() => {});
//   };

  const navLinks = (
    <>
      <li><NavLink to="/" className="hover:text-green-600">Home</NavLink></li>
      <li><NavLink to="/about" className="hover:text-green-600">About</NavLink></li>
      <li><NavLink to="/contact" className="hover:text-green-600">Contact</NavLink></li>
      <li><NavLink to="/coverage" className="hover:text-green-600">Coverage Area</NavLink></li>
      <li><NavLink to="/join" className="hover:text-green-600">Join Us As Merchant</NavLink></li>
      <li><NavLink to="/login" className="hover:text-green-600">Log in</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md px-5 md:px-10">
      {/* Mobile Menu */}
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[50] p-4 shadow-lg bg-white text-gray-800 rounded-box w-60">
          {navLinks}
          {/* <div className="mt-4">
            {user ? (
              <div className="flex flex-col items-center gap-2">
                <img src={user.photoURL}
                  className="w-10 h-10 rounded-full border-2 border-green-600"
                  alt="User" />
                <p className="text-sm font-semibold">{user.displayName}</p>
                <button onClick={handleSignOut}
                  className="btn btn-sm btn-outline btn-success w-full">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn btn-outline btn-success w-full">Log In</button>
              </Link>
            )}
          </div> */}
        </ul>
      </div>

      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold text-[#2D6A4F]">QuickGoo</Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal px-1 space-x-4">
          {navLinks}
        </ul>
      </div>

      {/* User Info / Auth Button */}
      {/* <div className="flex-none">
        {user ? (
          <div className="flex items-center gap-3">
            <img src={user.photoURL}
              className="w-10 h-10 rounded-full border-2 border-green-600"
              alt="User" />
            <div className="flex-col hidden md:flex items-end">
              <p className="text-sm font-medium">{user.displayName}</p>
              <button onClick={handleSignOut}
                className="btn btn-sm btn-outline btn-success mt-1">
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-outline btn-success">Log In</button>
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default Navbar;
