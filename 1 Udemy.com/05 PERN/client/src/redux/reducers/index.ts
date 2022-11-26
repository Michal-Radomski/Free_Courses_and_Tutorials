import { combineReducers } from "redux";

import authReducer from "./authReducer";
import booleanReducer from "./booleanReducer";
import postsReducer from "./postsReducer";
import Reducer1 from "./reducer1";
import userReducer from "./userReducer";

// CombineReducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  postsReducer: postsReducer,
  userReducer: userReducer,
  booleanReducer: booleanReducer,
  reducer1: Reducer1,
});

export default rootReducer;
