import { combineReducers } from "redux";

import authReducer from "./auth";
import postsReducer from "./posts";

// CombineReducer
const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});

export default rootReducer;
