import {GET_CATEGORIES} from '../actionTypes';

const reducer = (initialState = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return [...action.payload];
    default:
      return initialState;
  }
};

export default reducer;
