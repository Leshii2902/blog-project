import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form'


import {usersListReducer} from "./reducers/usersListReducer";
import {postsListReducer} from "./reducers/postsListReducer";
import {topViewsPostsReducer} from "./reducers/topViewsPostsReducer";
import {topLikesPostsReducer} from "./reducers/topLikesPostsReducer";
import {blogerReducer} from "./reducers/blogerReducer";
import {commentatorReducer} from "./reducers/commentatorReducer";
import {userReducer} from './reducers/userReducer';
import {userPostsReducer} from './reducers/userPostsReducer';
import {feedReducer} from "./reducers/feedReducer";
import {subsReducer} from "./reducers/subsReducer";
import {followersReducer} from "./reducers/followersReducer";
import {postReducer} from "./reducers/postReducer";
import {postCommentsReducer} from "./reducers/postCommentsReducer";
import {loginReducer} from "./reducers/loginReducer";
import {opinionsReducer} from "./reducers/opinionsReducer";

import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise());

const reducers = combineReducers({
    usersList: usersListReducer,
    postsList: postsListReducer,
    topViewsPosts: topViewsPostsReducer,
    topLikesPosts: topLikesPostsReducer,
    bloger: blogerReducer,
    commentator: commentatorReducer,
    user: userReducer,
    userPosts: userPostsReducer,
    feed: feedReducer,
    subs: subsReducer,
    followers: followersReducer,
    post: postReducer,
    postComments: postCommentsReducer,
    login: loginReducer,
    opinions: opinionsReducer,
    form: formReducer
});

const store = createStore(reducers, middleware);


export default store;