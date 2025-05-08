import { useContext, useState, } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn(email, password);

      // JWT token fetch
      const res = await fetch("https://quickgoo1.vercel.app/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      const token = data.token;
      localStorage.setItem("token", token);

      // Check admin status
      const adminRes = await fetch(
        `https://quickgoo1.vercel.app/users/admin/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const adminData = await adminRes.json();
      const isAdmin = adminData?.isAdmin;

      toast.success("Login successful!");

      // Redirect depending on role
      setTimeout(() => {
        if (isAdmin) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }, 1200);

      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
      <Helmet>
        <title>QuickGoo | Login</title>
      </Helmet>
      <ToastContainer position="top-center" autoClose={2500} />
      <div className="card w-full max-w-md shadow-xl bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-white">Please Login</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <div className="form-control">
            <label className="label text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full text-green-800"
              required
            />
          </div>

          <div className="form-control mt-2 relative">
            <label className="label text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full text-green-800"
              required
            />
            <span
              className="absolute right-3 top-11 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          <div className="form-control mt-4">
            <button className="btn btn-success w-full text-white border-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          New to this website?{" "}
          <Link to="/register" className="text-white font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
