import { Navigate } from "react-router-dom"
import { useAuth } from "./Context";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute
