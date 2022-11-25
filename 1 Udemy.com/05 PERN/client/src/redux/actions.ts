import * as actionTypes from "./actionTypes";

export const SUCCESS = {
  type: actionTypes.SUCCESS,
};

export const FAILURE = {
  type: actionTypes.FAILURE,
};

export const success = () => {
  return {
    type: actionTypes.SUCCESS,
  };
};

export const failure = () => {
  return {
    type: actionTypes.FAILURE,
  };
};

export const user_input = (text: string) => {
  return {
    type: actionTypes.USER_INPUT,
    payload: text,
  };
};

export const login_success = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

export const login_failure = () => {
  return {
    type: actionTypes.LOGIN_FAILURE,
  };
};

export const add_profile = (profile: Object) => {
  return {
    type: actionTypes.ADD_PROFILE,
    payload: profile,
  };
};

export const remove_profile = () => {
  return {
    type: actionTypes.REMOVE_PROFILE,
  };
};

export const set_db_profile = (profile: Object) => {
  return {
    type: actionTypes.SET_DB_PROFILE,
    payload: profile,
  };
};

export const remove_db_profile = () => {
  return {
    type: actionTypes.REMOVE_DB_PROFILE,
  };
};

export const fetch_db_posts = (posts: string[]) => {
  return {
    type: actionTypes.FETCH_DB_POSTS,
    payload: posts,
  };
};

export const remove_db_posts = () => {
  return {
    type: actionTypes.REMOVE_DB_POSTS,
  };
};

export const fetch_post_comments = (comments: string[]) => {
  return {
    type: actionTypes.FETCH_POST_COMMENTS,
    payload: comments,
  };
};

export const remove_post_comments = () => {
  return {
    type: actionTypes.REMOVE_POST_COMMENTS,
  };
};

export const fetch_user_posts = (posts: string[]) => {
  return {
    type: actionTypes.FETCH_USER_POSTS,
    payload: posts,
  };
};

export const remove_user_posts = () => {
  return {
    type: actionTypes.REMOVE_USER_POSTS,
  };
};

export const fetch_search_posts = (posts: string[]) => {
  return {
    type: actionTypes.SEARCH_POSTS_SUCCESS,
    payload: posts,
  };
};

export const remove_search_posts = () => {
  return {
    type: actionTypes.SEARCH_POSTS_FAILURE,
  };
};

//Get posts from the DB based on user Id of another user
export function get_other_user_db_posts(posts: string[]) {
  return {
    type: actionTypes.FETCH_OTHER_USER_DB_POSTS_SUCCESS,
    payload: posts,
  };
}

export function remove_other_user_db_posts() {
  return {
    type: actionTypes.REMOVE_OTHER_USER_DB_POSTS,
  };
}

//Actions for rendering profile info of another user
export function set_other_user_db_profile(profile: Object) {
  return {
    type: actionTypes.SET_OTHER_USER_DB_PROFILE,
    payload: profile,
  };
}

export function remove_other_user_db_profile() {
  return {
    type: actionTypes.REMOVE_OTHER_USER_DB_PROFILE,
  };
}

//Actions for setting users messages
export function set_user_messages(messages: string[]) {
  return {
    type: actionTypes.SET_USER_MESSAGES,
    payload: messages,
  };
}

export function remove_user_messages() {
  return {
    type: actionTypes.REMOVE_USER_MESSAGES,
  };
}
