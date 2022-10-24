import { useContext, useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import AppContext from "../../store/context";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error(error)
      }
      finally {
        setIsLoading(false);
      }
    }
    console.log(auth?.accessToken)

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading])

  return <>
    {isLoading ? <p>Loading...</p> : <Outlet />}
  </>
}

export default PrivateRoute;