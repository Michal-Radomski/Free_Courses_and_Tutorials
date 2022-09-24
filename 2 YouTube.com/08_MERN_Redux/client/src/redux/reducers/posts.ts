import { Action, IPost, RootState } from "../../Types";
import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE, UPDATE } from "../actionTypes";

const initialState: RootState = [];

const postsReducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((post: IPost) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return state.filter((post: IPost) => post._id !== action.payload);
    case LIKE:
      return state.map((post: IPost) => (post._id === action.payload._id ? action.payload : post));
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };

    default:
      return state;
  }
};

export default postsReducer;
