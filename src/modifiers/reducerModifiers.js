
const initialState = {
  isLoading: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_MODIFIERS_PENDING':
      return { ...state, isLoading: true };
    case 'CREATE_MODIFIERS_FULFILLED':
      state.data.push(action.payload.data);
      return { ...state, isLoading: false };
    case 'CREATE_MODIFIERS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    case 'UPDATE_MODIFIERS_PENDING':
      return { ...state, isLoading: true };
    case 'UPDATE_MODIFIERS_FULFILLED': {
      const newResultsAfterUpdate = state.data.map((result) => {
        if (result._id === action.payload.data._id) {
          return action.payload.data;
        }
        return result;
      });
      return { ...state, data: newResultsAfterUpdate, isLoading: false };
    }
    case 'UPDATE_MODIFIERS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    case 'GET_MODIFIERS_PENDING':
      return { ...state, isLoading: true };
    case 'GET_MODIFIERS_FULFILLED':
      return { ...state, data: action.payload.data, isLoading: false };
    case 'GET_MODIFIERS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    case 'DELETE_MODIFIERS_PENDING':
      return { ...state, isLoading: true };
    case 'DELETE_MODIFIERS_FULFILLED': {
      const newResultsAfterDelete = state.data.filter(result => result._id !== action.payload.data._id);
      return { ...state, data: newResultsAfterDelete, isLoading: false };
    }
    case 'DELETE_MODIFIERS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    default:
      return state;
  }
};
