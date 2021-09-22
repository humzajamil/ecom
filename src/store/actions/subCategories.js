import * as api from '../../api';
import {GET_SUBCATEGORIES} from '../actionTypes';

export const getSubCategories = () => async dispatch => {
  console.log('getSubCategories action triggered **************');
  try {
    const {data} = await api.getSubCategories();
    dispatch({type: GET_SUBCATEGORIES, payload: data});
  } catch (error) {
    console.log(error);
  }
};
