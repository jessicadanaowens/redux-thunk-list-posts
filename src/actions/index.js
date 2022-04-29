import jsonPlaceholder from "../apis/jsonPlaceholder";
import {lodash} from "lodash/seq";
import _ from "lodash";

// action creators return a function that gets dispatched
//whenever we call an action creator within another action creator, we need to manually invoke dispatch
// when we call dispatch, the function shows up in thunk, and thunk passes dispatch to it
// dispatch and getState is passed in via thunk.  Thunk invokes the function
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();

    // await Promise.all(userIds.map(id => dispatch(fetchUser(id))))
};

// we have thunk setup which is why we can use async/await here
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data});
}

// a function that returns a function
// export const fetchUser = id => dispatch => {
//     _fetchUser(id, dispatch);
// };

// only fetch each user exactly one time
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: response.data});
// });

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data});
};

export const selectPost = (post) => {
    return {
        type: 'SELECT_POST',
        payload: post
    }
}