import { combineReducers } from "redux";

import authReducer from "./authReducer";
import booleanReducer from "./booleanReducer";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";

// CombineReducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  postsReducer: postsReducer,
  userReducer: userReducer,
  booleanReducer: booleanReducer,
});

export default rootReducer;
