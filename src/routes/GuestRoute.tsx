import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function GuestRoute() {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default GuestRoute