import * as TopLikesPosts from '../constants/topLikesPostsConstants';
import * as DeletePost from '../constants/deletePost';
import * as PostLikes from '../constants/postLikesConstants';

import {addLike} from '../reducersFunctions/addLike';
import {deleteLike} from "../reducersFunctions/deleteLike";
import {deletePostOrComment} from "../reducersFunctions/deletePostOrComment";

export function topLikesPostsReducer(state = {posts: [], is_fetching: false}, action) {
    switch (action.type) {
        // получить топ отмеченных постов
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_PENDING: {
            state = {
                ...state,
                is_fetching: true
            };
            break;
        }
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_FULFILLED: {
            state = {
                ...state,
                is_fetching: false,
                posts: action.payload.data
            };
            break;
        }
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_REJECTED: {
            state = {
                ...state,
                is_fetching: false,
                error_message: action.payload.message
            };
            break;
        }

        // добавить лайк
        case PostLikes.ADD_POST_LIKE_PENDING: {
            state = {...state,
                is_fetching: false};
            break;
        }
        case PostLikes.ADD_POST_LIKE_FULFILLED: {
            let posts = addLike([...state.posts], action.payload.data);
            state = {...state, posts: posts, is_fetching: false};
            break;
        }
        case PostLikes.ADD_POST_LIKE_REJECTED: {
            state = {...state,
                is_fetching: false,
                error_message: action.payload.message};
            break;
        }

        // удалить лайк
        case PostLikes.DELETE_POST_LIKE_PENDING: {
            state = {...state,
                is_fetching: false};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_FULFILLED: {
            let posts = deleteLike([...state.posts], action.payload.data);
            state = {...state, posts: posts, is_fetching: false};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_REJECTED: {
            state = {...state,
                is_fetching: false,
                error_message: action.payload.message};
            break;
        }

        // удаление поста
        case DeletePost.DELETE_POST_PENDING: {
            state = {...state,
                is_fetching: true};
            break;
        }
        case DeletePost.DELETE_POST_FULFILLED: {
            let posts = deletePostOrComment([...state.posts], action.payload);
            state = {...state, is_fetching: false, posts: posts};
            break;
        }
        case DeletePost.DELETE_POST_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}