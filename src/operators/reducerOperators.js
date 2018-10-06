
const initialState = {
  isLoading: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_OPERATORS_PENDING':
      return { ...state, isLoading: true };
    case 'CREATE_OPERATORS_FULFILLED':
      state.data.push(action.payload.data);
      return { ...state, isLoading: false };
    case 'CREATE_OPERATORS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    case 'GET_OPERATORS_PENDING':
      return { ...state, isLoading: true };
    case 'GET_OPERATORS_FULFILLED':
      return { ...state, data: action.payload.data, isLoading: false };
    case 'GET_OPERATORS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    default:
      return state;
  }
};
