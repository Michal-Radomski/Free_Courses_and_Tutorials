import { Action, RootState } from "../../Types";

import { CREATE, FETCH_ALL } from "../actionTypes";

const initialState: RootState = [];

const postsReducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default postsReducer;
