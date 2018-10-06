import axios from 'axios';

import { store } from '../publics/redux/store';
import config from '../publics/utils/config.json';
import objectId from '../publics/utils/objectId';

export const createOrders = (value) => {
  const { data } = store.getState().transactions;
  const progressTransactions = data.filter(transaction => transaction.isProgress);
  let transaction = null;
  if (progressTransactions.length > 0) {
    // for secound etc orders
    const progressOrderObj = Object.assign(
      {},
      ...progressTransactions[0].orders.map(item => ({ [item.productId]: true }))
    );
    if (progressOrderObj[value._id]) {
      // for orders existed
      let remakeOrderExisted = [];
      let addNewOrder = true;
      if (value.modifiers.length === 0) {
        // for orders without modifiers
        remakeOrderExisted = progressTransactions[0].orders.map((order) => {
          if (order.productId === value._id) {
            addNewOrder = false;
            return { ...order, qty: order.qty + value.qty };
          }
          return order;
        });
      } else {
        // for order with modifiers
        remakeOrderExisted = progressTransactions[0].orders.map((order) => {
          if (order.productId === value._id) {
            if (order.modifiers.length === value.modifiers.length) {
              const modifiersExisted = Object.assign(
                {},
                ...order.modifiers.map(modifier => ({ [modifier._id]: true }))
              );
              let modifiersSame = true;
              // check value modifiers same or not with older order modifiers
              value.modifiers.forEach((modifier) => {
                if (!modifiersExisted[modifier._id]) {
                  modifiersSame = false;
                }
              });
              if (modifiersSame) {
                // order modifiers is same
                addNewOrder = false;
                return { ...order, qty: order.qty + value.qty };
              }
            }
          }
          return order;
        });
      }
      // value add to new orders
      if (addNewOrder) {
        remakeOrderExisted.push({
          _id: objectId(),
          ...value,
          productId: value._id
        });
      }
      transaction = {
        ...progressTransactions[0],
        orders: remakeOrderExisted
      };
    } else {
      // for orders with modifiers
      transaction = {
        ...progressTransactions[0],
        orders: [
          ...progressTransactions[0].orders,
          {
            ...value,
            _id: objectId(),
            productId: value._id
          }
        ]
      };
    }
  } else {
    // for first orders
    transaction = {
      _id: objectId(),
      isProgress: true,
      isSaved: false,
      orders: [
        {
          ...value,
          _id: objectId(),
          productId: value._id
        }
      ]
    };
  }
  return {
    type: 'CREATE_ORDERS',
    payload: transaction
  };
};

export const deleteOrdersById = (id) => {
  const { data } = store.getState().transactions;
  let progressTransaction = data.filter(transaction => transaction.isProgress)[0];
  const orders = progressTransaction.orders.filter(order => order._id !== id);
  progressTransaction = {
    ...progressTransaction,
    orders
  };
  return {
    type: 'DELETE_ORDERS',
    payload: progressTransaction
  };
};

export const deleteOrders = (value) => {
  const { data } = store.getState().transactions;
  let progressTransaction = data.filter(transaction => transaction.isProgress)[0];
  let orders = progressTransaction.orders.map((order) => {
    if (order._id === value) {
      return { ...order, qty: order.qty - 1 };
    }
    return order;
  });
  orders = orders.filter(order => order.qty !== 0);
  progressTransaction = {
    ...progressTransaction,
    orders
  };
  return {
    type: 'DELETE_ORDERS',
    payload: progressTransaction
  };
};

export const deleteOrdersByProductId = (value) => {
  const { data } = store.getState().transactions;
  let progressTransaction = data.filter(transaction => transaction.isProgress)[0];
  const orders = progressTransaction.orders.filter(order => order.productId !== value);
  progressTransaction = {
    ...progressTransaction,
    orders
  };
  return {
    type: 'DELETE_ORDERS',
    payload: progressTransaction
  };
};

export const createTransaction = (value) => {
  const { user, outlet } = store.getState().settings;
  const rebuildValue = {
    ...value,
    outletId: outlet._id
  };
  return {
    type: 'CREATE_TRANSACTIONS',
    payload: axios({
      method: 'POST',
      url: `${config.BASE_URL}/transactions`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      data: rebuildValue
    })
  };
};
