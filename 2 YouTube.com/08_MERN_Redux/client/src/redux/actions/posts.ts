import * as API from "../../Api/index";
import { AppDispatch, CustomError, IPost } from "../../Types";
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../actionTypes";

export const getPosts = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.fetchPosts();
    // console.log({ data });
    // dispatch(action)
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log((error as CustomError).message);
  }
};

export const createPost = (post: IPost) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log((error as CustomError).message);
  }
};

export const updatePost = (id: string, post: IPost) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    // console.log((error as CustomError).message);
    console.log({ error });
  }
};

export const deletePost = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await API.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    // console.log((error as CustomError).message);
    console.log({ error });
  }
};

export const likePost = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log((error as CustomError).message);
  }
};
