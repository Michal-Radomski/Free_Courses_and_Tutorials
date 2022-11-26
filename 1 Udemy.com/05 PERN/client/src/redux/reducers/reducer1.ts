import { Action, RootState } from "../../Interfaces";
import * as actionTypes from "../actionTypes";

const initialState: RootState = {
  stateprop1: false,
};

const Reducer1 = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SUCCESS:
      return {
        ...state,
        stateprop1: true,
      };
    case actionTypes.FAILURE:
      return {
        ...state,
        stateprop1: false,
      };
    default:
      return state;
  }
};

export default Reducer1;
