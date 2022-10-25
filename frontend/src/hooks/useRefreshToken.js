import { useContext } from 'react';
import AppContext from '../store/context';
import appApi from '../services/appApi';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
  const { setAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await appApi.getRefreshToken();
      setAuth(response);
      return response?.accessToken;

    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  }
  return refresh;
};

export default useRefreshToken;