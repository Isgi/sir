
const initialState = {
  isLoading: false,
  data: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_OUTLETS_PENDING':
      return { ...state, isLoading: true };
    case 'CREATE_OUTLETS_FULFILLED':
      state.data.push(action.payload.data);
      return { ...state, isLoading: false };
    case 'CREATE_OUTLETS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    case 'GET_OUTLETS_PENDING':
      return { ...state, isLoading: true };
    case 'GET_OUTLETS_FULFILLED':
      return { ...state, data: action.payload.data, isLoading: false };
    case 'GET_OUTLETS_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    default:
      return state;
  }
};
