import { createUserWithEmailAndPassword,  getAuth,  onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../../firebase.config";





// const auth = getAuth(app);
export const AuthContext = createContext(null);
const auth = getAuth(app);

const Authprovider = ({children}) => {
    const[user,setUser]=useState(null);

    const createUser = (email,password)=> {
        return createUserWithEmailAndPassword(auth ,email,password);
    }
    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut = () =>{
        return signOut(auth);
    }
useEffect( ()=>{
const unSubscribe = onAuthStateChanged(auth,currentUser=>{
    console.log('Changes',currentUser);
setUser(currentUser);
});
return () =>{
    return unSubscribe();
}

} ,[])
    const authinfo = {
        user,
        setUser,
        createUser,
        signIn,
        logOut,
        
     }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;