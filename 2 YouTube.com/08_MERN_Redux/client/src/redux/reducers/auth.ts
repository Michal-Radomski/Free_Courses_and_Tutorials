import { Action, RootState } from "../../Types";
import * as actionType from "../actionTypes";

const authReducer = (state: RootState = { authData: null, loading: false, errors: null }, action: Action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };

    default:
      return state;
  }
};

export default authReducer;
