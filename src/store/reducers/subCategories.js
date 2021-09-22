import {GET_SUBCATEGORIES} from '../actionTypes';

const reducer = (initialState = [], action) => {
  switch (action.type) {
    case GET_SUBCATEGORIES:
      return [...action.payload];
    default:
      return initialState;
  }
};

export default reducer;
