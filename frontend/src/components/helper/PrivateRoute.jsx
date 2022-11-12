import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefreshToken';
import AppContext from '../../store/context';
import Loading from '../UI/Loading';

function PrivateRoute() {
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
        if (isMounted) setIsLoading(false);
      }
    };
    console.log(auth?.accessToken);

    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return <Outlet />;
}

export default PrivateRoute;
