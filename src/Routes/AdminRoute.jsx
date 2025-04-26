import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Components/AuthProvider/AuthProvider";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); // null for initial loading
  const { user } = useContext(AuthContext);
 

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem("token");

      fetch(`http://localhost:6077/users/admin/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.admin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        })
        .catch((err) => {
          console.error("Admin check failed", err);
          setIsAdmin(false);
        });
    } else {
      setIsAdmin(false);
    }
  }, [user?.email]);

  // useEffect(() => {
  //   if (isAdmin === false) {
  //     navigate("/unauthorised");
  //   }
  // }, [isAdmin, navigate]);

  if (isAdmin === null) {
    return <div className="text-center mt-10 font-semibold">Checking admin status...</div>;
  }

  return children;
};

export default AdminRoute;
