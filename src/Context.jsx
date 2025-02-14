import React, { createContext, useState, useContext } from "react"
import { supabase } from "./supabase";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [userData, setUserData] = useState(null)
    const [visible, setVisible] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')
    const [identificationNumber, setIdentificationNumber] = useState('')
    const [hasRegistered, setHasRegistered] = useState(false)
    const [voteState, setVoteState] = useState("Preparation")

    const signOut = async () => {
        await supabase.auth.signOut()
        localStorage.removeItem('walletAddress')
        localStorage.removeItem('id')
        setHasRegistered(false)
        setVoteState("Preparation")
    }

    const toggle = () => {
        setVisible((prev) => !prev)
    }

    return (
        <AuthContext.Provider value={{ voteState, setVoteState, hasRegistered, setHasRegistered, walletAddress, setWalletAddress, identificationNumber, setIdentificationNumber, signOut, auth, setAuth, visible, toggle, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
