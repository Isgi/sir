import axios from 'axios';

import { store } from '../publics/redux/store';
import config from '../publics/utils/config.json';

export const createModifier = (value) => {
  const { user, outlet } = store.getState().settings;
  const rebuildValue = {
    ...value,
    outletId: outlet._id
  };
  return {
    type: 'CREATE_MODIFIERS',
    payload: axios({
      method: 'POST',
      url: `${config.BASE_URL}/modifiers`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      data: rebuildValue
    })
  };
};

export const updateModifier = (value) => {
  const { user, outlet } = store.getState().settings;
  const rebuildValue = {
    ...value,
    outletId: outlet._id
  };
  return {
    type: 'UPDATE_MODIFIERS',
    payload: axios({
      method: 'PUT',
      url: `${config.BASE_URL}/modifiers/${rebuildValue._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      data: rebuildValue
    })
  };
};

export const getModifier = (value) => {
  const { user, outlet } = store.getState().settings;
  return {
    type: 'GET_MODIFIERS',
    payload: axios({
      method: 'GET',
      url: `${config.BASE_URL}/modifiers?outletId=${outlet._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    })
  };
};

export const deleteModifier = (id) => {
  const { user } = store.getState().settings;
  return {
    type: 'DELETE_MODIFIERS',
    payload: axios({
      method: 'DELETE',
      url: `${config.BASE_URL}/modifiers/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    })
  };
};

