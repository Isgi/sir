import axios from 'axios';

import { store } from '../publics/redux/store';
import config from '../publics/utils/config.json';

export const createProduct = (value) => {
  const { user, outlet } = store.getState().settings;
  const rebuildValue = {
    ...value,
    outletId: outlet._id
  };
  return {
    type: 'CREATE_PRODUCTS',
    payload: axios({
      method: 'POST',
      url: `${config.BASE_URL}/products`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      data: rebuildValue
    })
  };
};

export const updateProduct = (value) => {
  const { user, outlet } = store.getState().settings;
  const rebuildValue = {
    ...value,
    outletId: outlet._id
  };
  return {
    type: 'UPDATE_PRODUCTS',
    payload: axios({
      method: 'PUT',
      url: `${config.BASE_URL}/products/${rebuildValue._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      data: rebuildValue
    })
  };
};

export const getProduct = (value) => {
  const { user, outlet } = store.getState().settings;
  return {
    type: 'GET_PRODUCTS',
    payload: axios({
      method: 'GET',
      url: `${config.BASE_URL}/products?outletId=${outlet._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    })
  };
};

export const deleteProduct = (id) => {
  const { user } = store.getState().settings;
  return {
    type: 'DELETE_PRODUCTS',
    payload: axios({
      method: 'DELETE',
      url: `${config.BASE_URL}/products/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    })
  };
};

