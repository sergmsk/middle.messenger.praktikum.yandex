import { UserData } from '../api/UserAPI';
import { Action } from '../utils/store';
import { Props } from '../utils/types';

const SET_USER = 'user/SET';
const SET_RESULT_SEARCH_USERS = 'user/SET_RESULT_SEARCH_USERS';
const CLEAR_RESULT_SEARCH_USERS = 'user/CLEAR_RESULT_SEARCH_USERS';
const DELETE_USER = 'user/DELETE';

export const setUser = (user: UserData): Props => ({
  type: SET_USER,
  payload: user,
});

export const deleteUser = (): Props => ({
  type: DELETE_USER,
});

export const setResultSearchUsers = (users: UserData[]): Props => ({
  type: SET_RESULT_SEARCH_USERS,
  payload: users,
});

export const clearResultSearchUsers = (): Props => ({
  type: CLEAR_RESULT_SEARCH_USERS,
  payload: null,
});



export default (state = { profile: null, search: null }, action: Action): Props => {
  switch (action.type) {
    case SET_USER:
      return { profile: action.payload, search: null };
    case SET_RESULT_SEARCH_USERS:
      return { profile: state.profile, search: action.payload };
    case CLEAR_RESULT_SEARCH_USERS:
      return { profile: state.profile, search: action.payload };
    case DELETE_USER:
      return { profile: null, search: null };
    default:
      return state;
  }
}