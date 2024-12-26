import React, { createContext, useState, useContext, useEffect } from "react"
import { supabase } from "./supabase";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [userData, setUserData] = useState(null)

    const signOut = async () => {
        await supabase.auth.signOut()
    }

    return (
        <AuthContext.Provider value={{ signOut, auth, setAuth, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
