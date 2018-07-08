import * as Post from '../constants/postConstants';

export function postReducer(state = {post: {}, is_fetching: false}, action) {
    switch (action.type) {
        case Post.FETCH_POST_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Post.FETCH_POST_FULFILLED: {
            state = {...state, post: action.payload.data, is_fetching: false};
            break;
        }
        case Post.FETCH_POST_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}