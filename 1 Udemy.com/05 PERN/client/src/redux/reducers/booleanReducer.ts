import { Action, RootState } from "../../Interfaces";
import * as actionTypes from "../actionTypes";

const initialState: RootState = {
  stateProp: false,
};

const booleanReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SUCCESS:
      return {
        ...state,
        stateProp: true,
      };
    case actionTypes.FAILURE:
      return {
        ...state,
        stateProp: false,
      };
    default:
      return state;
  }
};

export default booleanReducer;
