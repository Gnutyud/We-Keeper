import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  if (isLoggedIn) return <>{children}</>
  return <Navigate to={"/login"} />
}

export default PrivateRoute;