import axios from 'axios';

import { store } from '../publics/redux/store';
import config from '../publics/utils/config.json';

export const createOperator = (value) => {
  const { user, outlet } = store.getState().settings;
  const rebuildValue = {
    ...value,
    outletId: outlet._id
  };
  return {
    type: 'CREATE_OPERATORS',
    payload: axios({
      method: 'POST',
      url: `${config.BASE_URL}/operators`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      data: rebuildValue
    })
  };
};

export const getOperator = (value) => {
  const { user, outlet } = store.getState().settings;
  return {
    type: 'GET_OPERATORS',
    payload: axios({
      method: 'GET',
      url: `${config.BASE_URL}/operators?outletId=${outlet._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    })
  };
};
