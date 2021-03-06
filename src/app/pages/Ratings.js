import React from 'react';

import PostItem from '../components/Content/PostItem';
import UserTop from '../components/Content/UserTop';
import Loader from '../components/Content/Loader';

import {connect} from 'react-redux';

import {fetchTopViewsPosts} from "../actions/topViewsPostsActions";
import {fetchTopLikesPosts} from "../actions/topLikesPostsActions";
import {deletePost} from "../actions/deletePost";
import {fetchBloger} from "../actions/blogerActions";
import {fetchCommentator} from "../actions/commentatorActions";
import {fetchLoginData} from "../actions/loginActions";
import {addPostLike, deletePostLike} from "../actions/postLikesActions";

import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";
import {like} from "../componentsFunctions/like";


@connect((store) => {
    return {
        topViewsPosts: store.topViewsPosts.posts,
        is_top_views_posts_fetching: store.topViewsPosts.is_fetching,

        topLikesPosts: store.topLikesPosts.posts,
        is_top_likes_posts_fetching: store.topLikesPosts.is_fetching,

        bloger: store.bloger.user,
        is_bloger_fetching: store.bloger.is_fetching,

        commentator: store.commentator.user,
        is_commentator_fetching: store.commentator.is_fetching,

        login: store.login.login,
        is_login_fetching: store.login.is_fetching
    }
})

export default class Ratings extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchTopViewsPosts());
        this.props.dispatch(fetchTopLikesPosts());
        this.props.dispatch(fetchBloger());
        this.props.dispatch(fetchCommentator());
        this.props.dispatch(fetchLoginData());
        this.like = this.like.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    // добавить/удалить лайк
    like(post_id) {
        if (!this.props.login.id) return;
        like(this.props.topViewsPosts, post_id, this.props.dispatch, addPostLike, deletePostLike, this.props.login.id);
        like(this.props.topLikesPosts, post_id, this.props.dispatch, addPostLike, deletePostLike, this.props.login.id);
    }

    // удалить пост
    deletePost(post_id) {
        if (!this.props.login.id) return;
        this.props.dispatch(deletePost(post_id));
        this.props.dispatch(deletePost(post_id));
        this.props.dispatch(fetchTopViewsPosts());
        this.props.dispatch(fetchTopLikesPosts());
    }

    render() {
        let top_views_posts = this.props.topViewsPosts.map((post, index) => {
            return <PostItem post={post}
                             key={index}
                             triggerLike={this.like}
                             delete={this.deletePost}
                             login={this.props.login}/>
        });

        let top_likes_posts = this.props.topLikesPosts.map((post, index) => {
            return <PostItem post={post}
                             key={index}
                             triggerLike={this.like}
                             delete={this.deletePost}
                             login={this.props.login}/>
        });


        return (
            <div className="content__ratings">
                <div className="content__top_users">
                    <aside className="content__top_user">
                        <h2 className="content__top_user_h2">Самый активный автор</h2>
                            {this.props.is_bloger_fetching || this.props.is_users_fetching
                                ? <Loader/>
                                : <UserTop user={this.props.bloger}/>}
                    </aside>
                    <aside className="content__top_user">
                        <h2 className="content__top_user_h2">Самый активный комментатор</h2>
                            {this.props.is_commentator_fetching || this.props.is_users_fetching
                                ? <Loader/>
                                : <UserTop user={this.props.commentator}/>}
                    </aside>

                </div>
                <div className="content__top_posts">
                    <aside className="content__top_post_aside">
                        <h2 className="content__top_post_h2">Топ 5 просмотренных записей</h2>
                            {this.props.is_top_views_posts_fetching
                                ? <Loader/>
                                : <div> {top_views_posts} </div>}
                    </aside>
                    <aside className="content__top_post_aside">
                        <h2 className="content__top_post_h2">Топ 5 отмеченных записей</h2>
                            {this.props.is_top_likes_posts_fetching
                                ? <Loader/>
                                : <div>{top_likes_posts}</div>}
                    </aside>
                </div>
                <div className="link_to_up" onClick={() => {scrollTop()}}/>
            </div>
        )
    }

    componentDidMount() {
        scrollTop();
        $(document).off();
        $(document).on('scroll', () => {
            linkUp();
        });
    }
}