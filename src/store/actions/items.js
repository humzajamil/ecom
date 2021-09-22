import * as api from '../../api';
import {ITEMS} from '../actionTypes';

export const getItems = () => async dispatch => {
  console.log('getItems action triggered **************');
  try {
    const {data} = await api.getItems();
    console.log(data, 'sdfksjhdfkjshdfjkhsk');
    dispatch({type: ITEMS, payload: data});
  } catch (error) {
    console.log(error);
  }
};
