import * as api from '../../api';
import {REGISTER_USER} from '../actionTypes';

export const registerUser = registerUserData => async dispatch => {
  console.log('registerUser action triggered **************');
  try {
    console.log(registerUserData, 'action');
    const {data} = await api.registerUser(registerUserData);
    dispatch({type: REGISTER_USER, payload: data});
  } catch (error) {
    console.log(error);
  }
};
