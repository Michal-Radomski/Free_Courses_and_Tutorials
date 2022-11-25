import { Action, RootState } from "../../Interfaces";
import * as actionTypes from "../actionTypes";

const initialState: RootState = {
  is_authenticated: false,
  profile: null,
  db_profile: null,
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        is_authenticated: true,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        is_authenticated: false,
      };
    case actionTypes.ADD_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case actionTypes.REMOVE_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case actionTypes.SET_DB_PROFILE:
      return {
        ...state,
        db_profile: action.payload,
      };
    case actionTypes.REMOVE_DB_PROFILE:
      return {
        ...state,
        db_profile: null,
      };
    default:
      return state;
  }
};

export default authReducer;
