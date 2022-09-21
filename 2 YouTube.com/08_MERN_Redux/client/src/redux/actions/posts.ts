import * as apiPosts from "../../Api/index";
import { AppDispatch, CustomError, IPost } from "../../Types";
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../actionTypes";

export const getPosts = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await apiPosts.fetchPosts();
    // console.log({ data });
    // dispatch(action)
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log((error as CustomError).message);
  }
};

export const createPost = (post: IPost) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await apiPosts.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log((error as CustomError).message);
  }
};

export const updatePost = (id: string, post: IPost) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await apiPosts.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    // console.log((error as CustomError).message);
    console.log({ error });
  }
};

export const deletePost = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await apiPosts.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    // console.log((error as CustomError).message);
    console.log({ error });
  }
};

export const likePost = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await apiPosts.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log((error as CustomError).message);
  }
};
