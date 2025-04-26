import { createContext, useEffect, useState } from "react";
import app from "../../../firebase.config";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // 👉 token রাখার state

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('User changed:', currentUser);
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        currentUser.getIdToken()
          .then(token => {
            setToken(token); // 👉 token save
          });
      } else {
        setToken(null); // user null হলে token মুছে ফেলি
      }
    });

    return () => unSubscribe();
  }, []);

  const authinfo = {
    user,
    token,       // 👉 এখন token ব্যবহার করা যাবে context থেকে
    loading,
    setUser,
    createUser,
    signIn,
    logOut
  };

  return (
    <AuthContext.Provider value={authinfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Authprovider;
