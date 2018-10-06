
const initialState = {
  isLoading: false,
  data: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'REGISTER_PENDING':
      return { ...state, isLoading: true };
    case 'REGISTER_FULFILLED':
      return { ...state, data: action.payload.data, isLoading: false };
    case 'REGISTER_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    case 'LOGIN_PENDING':
      return { ...state, isLoading: true };
    case 'LOGIN_FULFILLED':
      return { ...state, data: action.payload.data, isLoading: false };
    case 'LOGIN_REJECTED':
      return { ...state, error: action.payload.data, isLoading: false };

    default:
      return state;
  }
};
