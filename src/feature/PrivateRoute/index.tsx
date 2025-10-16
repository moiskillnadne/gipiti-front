import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useProfileQuery } from "../../entity/user/hooks/useMeQuery"

export const PrivateRoute = () => {
  const location = useLocation()
  const { data: user, isLoading, isError } = useProfileQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}