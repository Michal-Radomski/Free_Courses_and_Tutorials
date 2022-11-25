import { Action, RootState } from "../../Interfaces";
import * as actionTypes from "../actionTypes";

const initialState: RootState = {
  user_text: "",
  OtherUserDBProfile: null,
  db_other_user_posts: [],
  UserMessages: [],
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.USER_INPUT:
      return {
        ...state,
        user_text: action.payload,
      };
    case actionTypes.SET_OTHER_USER_DB_PROFILE:
      return {
        ...state,
        OtherUserDBProfile: action.payload,
      };
    case actionTypes.REMOVE_OTHER_USER_DB_PROFILE:
      return {
        ...state,
        OtherUserDBProfile: null,
      };
    case actionTypes.FETCH_OTHER_USER_DB_POSTS_SUCCESS:
      return {
        ...state,
        db_other_user_posts: action.payload,
      };
    case actionTypes.REMOVE_OTHER_USER_DB_POSTS:
      return {
        ...state,
        db_other_user_posts: [],
      };
    case actionTypes.SET_USER_MESSAGES:
      return {
        ...state,
        UserMessages: action.payload,
      };
    case actionTypes.REMOVE_USER_MESSAGES:
      return {
        ...state,
        UserMessages: [],
      };
    default:
      return state;
  }
};

export default userReducer;
