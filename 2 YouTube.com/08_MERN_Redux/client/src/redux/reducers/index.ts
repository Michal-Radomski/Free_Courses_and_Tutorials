import { combineReducers } from "redux";

import postsReducer from "./posts";

// CombineReducer
const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
