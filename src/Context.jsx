import React, { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) setIsAuthenticated(true)
    }, [])

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem("user", "authenticated")
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
