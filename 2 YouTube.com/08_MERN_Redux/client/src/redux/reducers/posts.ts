import { Action, IPost, RootState } from "../../Types";
import {
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  LIKE,
  START_LOADING,
  UPDATE,
} from "../actionTypes";

const initialState: RootState = { isLoading: true, posts: [] };

const postsReducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post: IPost) => (post._id === action.payload._id ? action.payload : post)),
      };
    case DELETE:
      return { ...state, posts: state.posts.filter((post: IPost) => post._id !== action.payload) };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post: IPost) => (post._id === action.payload._id ? action.payload : post)),
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload.post };

    default:
      return state;
  }
};

export default postsReducer;
