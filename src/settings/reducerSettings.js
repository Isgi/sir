const initialState = {
  user: null,
  outlet: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_SETTING':
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;

  }
};
