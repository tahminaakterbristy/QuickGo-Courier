import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";

import { Link } from "react-router-dom";



const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [success, setSucess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    if (password.length < 8) {
      setRegisterError("Password should be at least 8 characters long");
      return;
    }

    setSucess("");
    setRegisterError("");

    try {
      const result = await createUser(email, password);
      const user = result?.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      // Update context state
      setUser((currentUser) => ({
        ...currentUser,
        displayName: name,
        photoURL: photo,
      }));

      // Save user to your backend
      await fetch("http://localhost:6077/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          photoURL: photo,
          role: "user",
        }),
      });

      setSucess("User created successfully");
    } catch (error) {
      console.error(error);
      setRegisterError(error.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
    <div className="mx-auto md:w-1/2 mt-8 mb-8 lg:w-1/3 items-center p-5 bg-gradient-to-r from-green-500 to-green-300 dark:bg-gray-800 rounded-lg shadow-md">
       
      <h2 className="text-2xl mb-4 text-center text-gray-800 dark:text-white mt-8">Please Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full p-3 text-green-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="email"
          name="email"
          placeholder="Your Email Address"
          required
        />
        <input
          className="w-full p-3  text-green-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="password"
          name="password"
          placeholder="Your Password"
          required
        />
        <input
          className="w-full p-3 text-green-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <input
          className="w-full p-3 text-green-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="text"
          name="photo"
          placeholder="Your Photo URL"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 border-lg-white"
        >
          Register
        </button>
      </form>

      {/* Error and Success Messages */}
      {registerError && <p className="text-red-500 mt-4 text-center">{registerError}</p>}
      {success && <p className="text-white mt-4 text-center">{success}</p>}

      <div className="text-center mt-4 ">
        <p className="text-sm text-black-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/Login" className="text-green-800 font-bold hover:underline mb-8">
            Login
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
