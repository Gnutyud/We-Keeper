import { useContext } from 'react';
import AppContext from '../store/context';
import appApi from '../services/appApi';

const useRefreshToken = () => {
    const { setAuth } = useContext(AppContext);

    const refresh = async () => {
      try {
        const response = await appApi.getRefreshToken();
        setAuth(response);
        console.log(response);
        return response?.accessToken;
        
      } catch (error) {
        console.log(error)
      }
    }
    return refresh;
};

export default useRefreshToken;