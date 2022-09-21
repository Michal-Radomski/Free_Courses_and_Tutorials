import * as apiPosts from "../../Api/index";
import { AppDispatch, CustomError } from "../../Types";
import { FETCH_ALL } from "../actionTypes";

export const getPosts = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await apiPosts.fetchPosts();
    console.log({ data });

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log((error as CustomError).message);
  }
};
