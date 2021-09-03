import * as api from '../../api';
import {AUTH} from '../actionTypes';

export const loginUser = loginUser => async dispatch => {
  console.log('loginUser action triggered **************');
  try {
    const res = await api.loginUser(loginUser);
    console.log(res.data.token, 'jlskdjflskdjfl');
    dispatch({type: AUTH, payload: res.data.token});
  } catch (error) {
    console.log(error);
  }
};
