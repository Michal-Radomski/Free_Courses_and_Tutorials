import { History } from "history";

import * as API from "../../Api/index";
import { AppDispatch, SignUp } from "../../Types";
import { AUTH } from "../actionTypes";

export const signin = (formData: SignUp, router: History) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log({ error });
  }
};

export const signup = (formData: SignUp, router: History) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log({ error });
  }
};
