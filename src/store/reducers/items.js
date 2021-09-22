import {ITEMS} from '../actionTypes';

const reducer = (initialState = [], action) => {
  switch (action.type) {
    case ITEMS:
      return [...action.payload];
    default:
      return initialState;
  }
};

export default reducer;
