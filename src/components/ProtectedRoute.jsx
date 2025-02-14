import { Navigate } from "react-router-dom"
import { useAuth } from "../Context";

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth()

    if (!auth) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute
