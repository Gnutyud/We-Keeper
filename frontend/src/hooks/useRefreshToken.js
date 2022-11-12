import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../store/context';
import appApi from '../services/appApi';

const useRefreshToken = () => {
  const { setAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const refresh = async () => {
    let token;
    try {
      const response = await appApi.getRefreshToken();
      setAuth(response);
      token = response?.accessToken;
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
    return token;
  };
  return refresh;
};

export default useRefreshToken;
