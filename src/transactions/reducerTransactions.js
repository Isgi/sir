const initialState = {
  isLoading: false,
  createPending: false,
  updatePending: false,
  deletePending: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TRANSACTIONS_PENDING':
      return {
        ...state,
        isLoading: true,
        createPending: true,
        updatePending: false,
        deletePending: false
      };
    case 'CREATE_TRANSACTIONS_FULFILLED': {
      const { data } = state;
      data.forEach((element, index) => {
        if (element.id === action.payload.data.id) {
          data[index] = action.payload.data;
        }
      });
      return {
        ...state,
        data,
        isLoading: false,
        createPending: false
      };
    }
    case 'CREATE_TRANSACTIONS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    case 'CREATE_ORDERS': {
      const getTransaction = state.data.filter(transaction => transaction._id === action.payload._id);
      let transactions = null;
      if (getTransaction.length > 0) {
        transactions = state.data.map((transaction) => {
          if (transaction._id === action.payload._id) {
            return action.payload;
          }
          return transaction;
        });
      } else {
        state.data.push(action.payload);
        transactions = state.data;
      }
      return { ...state, data: transactions };
    }
    case 'DELETE_ORDERS': {
      const transactions = state.data.map((transaction) => {
        if (transaction._id === action.payload._id) {
          return action.payload;
        }
        return transaction;
      });
      return { ...state, data: transactions };
    }
    default:
      return state;
  }
};
