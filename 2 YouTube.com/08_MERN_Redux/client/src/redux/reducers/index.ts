import { combineReducers } from "redux";

import posts from "./posts";

// CombineReducer
const rootReducer = combineReducers({
  posts: posts,
});

export default rootReducer;
