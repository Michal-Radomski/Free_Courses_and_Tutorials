import { Action, RootState } from "../../Types";

const initialState: RootState = [];

const postsReducer = function (state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
};

export default postsReducer;
