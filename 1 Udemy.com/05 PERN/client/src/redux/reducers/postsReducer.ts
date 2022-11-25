import { Action, RootState } from "../../Interfaces";
import * as actionTypes from "../actionTypes";

const initialState: RootState = {
  posts: [],
  comments: [],
  user_posts: [],
  db_search_posts: [],
};

const postsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.FETCH_DB_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case actionTypes.REMOVE_DB_POSTS:
      return {
        ...state,
        posts: [],
      };
    case actionTypes.FETCH_POST_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case actionTypes.REMOVE_POST_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case actionTypes.FETCH_USER_POSTS:
      return {
        ...state,
        user_posts: action.payload,
      };
    case actionTypes.REMOVE_USER_POSTS:
      return {
        ...state,
        user_posts: [],
      };
    case actionTypes.SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        db_search_posts: action.payload,
      };
    case actionTypes.SEARCH_POSTS_FAILURE:
      return {
        ...state,
        db_search_posts: [],
      };
    default:
      return state;
  }
};

export default postsReducer;
