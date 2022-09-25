import { History } from "history";

import * as API from "../../Api/index";
import { AppDispatch, CustomError, IPost } from "../../Types";
import {
  COMMENT,
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  LIKE,
  START_LOADING,
  UPDATE,
} from "../actionTypes";

export const getPosts = (page: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await API.fetchPosts(page);
    // console.log({ data });

    // dispatch(action)
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log((error as CustomError).message);
  }
};

export const getPost = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await API.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log({ error });
  }
};

export const createPost = (post: IPost, history: History) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.createPost(post);
    await history.push(`/posts/${data._id}`);

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

export const getPostsBySearch = (searchQuery: { search: string; tags: string }) => async (dispatch: AppDispatch) => {
  // console.log({ searchQuery });
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await API.fetchPostsBySearch(searchQuery);
    // console.log({ data });

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log({ error });
  }
};

export const commentPost = (value: string, id: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log({ error });
  }
};
