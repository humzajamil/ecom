import {REGISTER_USER, AUTH} from '../actionTypes';

const reducer = (initialState = [], action) => {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    case AUTH:
      return {...initialState, ...action.payload};
    default:
      return initialState;
  }
};

export default reducer;
