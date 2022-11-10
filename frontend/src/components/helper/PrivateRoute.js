import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefreshToken';
import AppContext from '../../store/context';
import Loading from '../UI/Loading';

const PrivateRoute = () => {
  const { auth } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    console.log(auth?.accessToken);

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PrivateRoute;
