import * as api from '../../api';
import {GET_CATEGORIES} from '../actionTypes';

export const getCategories = () => async dispatch => {
  console.log('getCategories action triggered **************');
  try {
    const {data} = await api.getCategories();
    console.log(data);
    dispatch({type: GET_CATEGORIES, payload: data});
  } catch (error) {
    console.log(error);
  }
};
