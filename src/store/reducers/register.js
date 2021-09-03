import {REGISTER_USER} from '../actionTypes';

const reducer = (initialState = [], action) => {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    default:
      return initialState;
  }
};

export default reducer;
