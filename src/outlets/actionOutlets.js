import axios from 'axios';

import { store } from '../publics/redux/store';
import config from '../publics/utils/config.json';

export const createOutlet = (value) => {
  const { user } = store.getState().settings;
  return {
    type: 'CREATE_OUTLETS',
    payload: axios({
      method: 'POST',
      url: `${config.BASE_URL}/outlets`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      data: value
    })
  };
};

export const getOutlet = (value) => {
  const { user } = store.getState().settings;
  return {
    type: 'GET_OUTLETS',
    payload: axios({
      method: 'GET',
      url: `${config.BASE_URL}/outlets`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    })
  };
};
