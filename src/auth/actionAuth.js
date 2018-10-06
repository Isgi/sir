import axios from 'axios';
import config from '../publics/utils/config.json';

export const register = (value) => {
  return {
    type: 'REGISTER',
    payload: axios({
      method: 'POST',
      url: `${config.BASE_URL}/auth/register`,
      data: value
    })
  };
};

export const login = (value) => {
  return {
    type: 'LOGIN',
    payload: axios({
      method: 'POST',
      url: `${config.BASE_URL}/auth/login`,
      data: value
    })
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};
