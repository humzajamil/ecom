import * as api from '../../api';
import {AUTH} from '../actionTypes';

export const loginUser = loginUser => async dispatch => {
  console.log('loginUser action triggered **************');
  try {
    const res = await api.loginUser(loginUser);
    let token = res.data.token;
    let user = res.data.user;
    dispatch({type: AUTH, payload: {token, user}});
  } catch (error) {
    console.log(error, 'auth action');
    dispatch({type: AUTH, payload: {error}});
  }
};
