import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {connect} from 'react-redux';

import PostItem from '../components/Content/PostItem';
import UserItem from '../components/Content/UserItem';
import Loader from '../components/Content/Loader';
import PostForm from '../components/Content/forms/PostForm';
import AvatarForm from '../components/Content/forms/AvatarForm';
import UserProfile from '../components/Content/UserProfile';
import EditUserForm from '../components/Content/forms/EditUserForm';
import EditPassForm from '../components/Content/forms/EditPassForm';


import {fetchUserPostsSample, addUserPost, deleteUserPost} from "../actions/userPostsActions";
import {fetchUserSubsSample, deleteSub} from "../actions/subsActions";
import {fetchUserSubscribesSample, deleteSubscribe} from "../actions/subscribesActions";
import {addPostLike, deletePostLike} from "../actions/postLikesActions";
import {editUser, changeAvatar, fetchLoginData} from "../actions/loginActions";
import {autoload} from "../componentsFunctions/autoload";
import {like} from '../componentsFunctions/like';
import {linkUp} from "../componentsFunctions/link_up";
import {scrollTop} from "../componentsFunctions/scrollTop";

@connect((store) => {
    return {
        login: store.login.login,
        is_login_fetching: store.login.is_fetching,

        user_posts: store.userPosts.posts,
        is_user_posts_fetching: store.userPosts.is_fetching,
        user_posts_empty: store.userPosts.empty,

        subs: store.subs.subs,
        is_subs_fetching: store.subs.is_fetching,
        subs_empty: store.subs.empty,

        subscribes: store.subscribes.subscribes,
        is_subscribes_fetching: store.subscribes.is_fetching,
        subscribes_empty: store.subscribes.empty
    }
})
export default class Cabinet extends React.Component {
    constructor() {
        super(...arguments);
        this.props.dispatch(fetchLoginData());
        this.props.dispatch(fetchUserPostsSample(0, this.props.login.id));
        this.props.dispatch(fetchUserSubsSample(0, this.props.login.id));
        this.props.dispatch(fetchUserSubscribesSample(0, this.props.login.id));

        this.triggerPostLike = this.triggerPostLike.bind(this);
        this.addPost = this.addPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.trigger = this.trigger.bind(this);
        this.editUser = this.editUser.bind(this);
        this.editPass = this.editPass.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.unsub = this.unsub.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);

        this.state = {
            info: 'info',
            avatar: 'button',
            post: 'button',
            content: 'posts'
        };

        this.extensions = ['jpeg', 'jpg'];
    }

    triggerPostLike(post_id) {
        like(this.props.user_posts,
            post_id,
            this.props.dispatch,
            addPostLike,
            deletePostLike,
            this.props.login.id);
    }

    addPost(values) {
        if (Object.keys(this.props.login).length === 0 || !values.title || !values.body) return;
        this.props.dispatch(addUserPost(this.props.login.id, values.title, values.body));
        this.trigger('post', 'button');
    }

    deletePost(post_id) {
        if (Object.keys(this.props.login).length === 0) return;
        this.props.dispatch(deleteUserPost(post_id));
    }

    trigger(param, value) {
        this.setState({
            [param]: value
        })
    }

    editUser(values) {
        values.id = this.props.login.id;
        this.props.dispatch(editUser(values));
        this.setState({
            info: 'info'
        })
    }

    editPass(values) {
        let incorrect_caution = document.querySelector('.pass_incorrect');
        let mismatch_caution = document.querySelector('.pass_mismatch');
        incorrect_caution.style.display = 'none';
        mismatch_caution.style.display = 'none';
        if (values.pass1 === values.pass2) {
            axios.post('/api/login/pass',
                {
                    user_id: this.props.login.id,
                    password: values.password,
                    new_pass: values.pass1
                }).then((responce) => {
                    if (responce.data[0] === 1) {
                        this.setState({
                            info: 'info'
                        })
                    } else {
                        incorrect_caution.style.display = 'inline';
                    }
            })
        } else {
            mismatch_caution.style.display = 'inline';
        }
    }

    changeAvatar(files) {
        if (!files[0]) return;
        let name_arr = files[0].name.split('.');
        let extension = name_arr[name_arr.length - 1];
        if (this.extensions.indexOf(extension) === -1) {
            return;
        }
        let data = new FormData();
        data.append('avatar', files[0], files[0].name);
        data.append('user_id', this.props.login.id);
        this.props.dispatch(changeAvatar(this.props.login.id, data));
        this.setState({
            avatar: 'button'
        })
    }

    unsub(sub_user_id) {
        this.props.dispatch(deleteSub(this.props.login.id, sub_user_id))
    }

    unsubscribe(user_id) {
        this.props.dispatch(deleteSubscribe(user_id, this.props.login.id))
    }

    render() {
        if (Object.keys(this.props.login).length === 0) {
            return <Redirect to="/login"/>
        }

        let posts = this.props.user_posts.map((post, index) => {
            return <PostItem post={post}
                             key={index}
                             triggerLike={this.triggerPostLike}
                             delete={this.deletePost}
                             login={this.props.login}/>
        });

        let subs = this.props.subs.map((sub, index) =>{
            return <UserItem key={index}
                             user={sub.sub_user}
                             button={'subs'}
                             unsub={this.unsub}
                             flag={true}/>;
        });

        let subscribes = this.props.subscribes.map((subscribe, index) => {
            return <UserItem key={index}
                             user={subscribe.user}
                             button={'subscribes'}
                             unsub={this.unsubscribe}
                             flag={false}/>
        });

        return (
            <div className="content__cabinet">

                <div className="content__cabinet__login">
                    <div className="content__cabinet__login_ava">
                        <img src={this.props.login.avatar_path} className="big_avatar"/>
                        {this.state.avatar === 'button' &&
                            <div className="change_avatar__div">
                                <button onClick={() => {this.trigger('avatar', 'form')}}
                                        className="button_custom button_edit_avatar">
                                    Сменить аватар
                                </button>
                            </div>
                        }
                        {this.state.avatar === 'form' &&
                            <AvatarForm changeAvatar={this.changeAvatar}
                                        trigger={this.trigger}/>
                        }
                    </div>
                    {this.state.info === 'info' &&
                    <UserProfile login={this.props.login}
                                 trigger={this.trigger}/>}
                    {this.state.info === 'form' &&
                    <EditUserForm onSubmit={this.editUser}
                                  login={this.props.login}
                                  trigger={this.trigger}/>}
                    {this.state.info === 'pass' &&
                    <EditPassForm onSubmit={this.editPass}
                                  login={this.props.login}
                                  trigger={this.trigger}/>}
                </div>

                <div className="buttons">
                    <button disabled={this.state.content === 'posts'}
                            onClick={() => {this.trigger('content', 'posts')}}
                            className="button_custom button_show_content">
                        Записи
                    </button>
                    <button disabled={this.state.content === 'subscriptions'}
                            onClick={() => {this.trigger('content', 'subscriptions')}}
                            className="button_custom button_show_content">
                        Подписки
                    </button>
                    <button disabled={this.state.content === 'subscribes'}
                            onClick={() => {this.trigger('content', 'subscribes')}}
                            className="button_custom button_show_content">
                        Подписчики
                    </button>
                </div>
                {this.state.content === 'posts' &&
                <div className="content__cabinet__content">
                    {this.state.post === 'button' &&
                    <div className="add_post__div">
                        <button onClick={() => {this.trigger('post', 'form')}}
                                className="button_custom button_add_post">
                            Добавить пост
                        </button>
                    </div>}
                    {this.state.post === 'form' &&
                    <PostForm onSubmit={this.addPost}
                              trigger={this.trigger}/>}

                    {this.props.user_posts.length !== 0 &&
                    <div>{posts}</div>}
                    <span className="point"/>
                    {this.props.is_user_posts_fetching &&
                    <Loader/>}
                </div>
                }
                {this.state.content === 'subscriptions' &&
                <div className="content__cabinet__content">
                    {this.props.subs.length !== 0 &&
                    <div>{subs}</div>}
                    <span className="point"/>
                    {this.props.is_subs_fetching &&
                    <Loader/>}
                </div>
                }
                {this.state.content === 'subscribes' &&
                <div className="content__cabinet__content">
                    {this.props.subscribes.length !== 0 &&
                    <div>{subscribes}</div>}
                    <span className="point"/>
                    {this.props.is_subscribes_fetching &&
                    <Loader/>}
                </div>
                }
                <div className="link_to_up" onClick={() => {scrollTop()}}/>

            </div>
        )
    }

    componentDidMount() {
        let login__panel_input = document.querySelector('#login__panel_input');
        if (login__panel_input) login__panel_input.checked = false;
        scrollTop();
    }

    componentDidUpdate() {
        $(document).off();
        $(document).on('scroll', () => {
            linkUp();
            switch (this.state.content) {
                case 'posts': {
                    autoload(this.props.is_user_posts_fetching,
                             this.props.user_posts_empty,
                             this.props.dispatch,
                             fetchUserPostsSample,
                             this.props.user_posts.length,
                             this.props.login.id);
                    break;
                }
                case 'subscriptions': {
                    autoload(this.props.is_subs_fetching,
                             this.props.subs_empty,
                             this.props.dispatch,
                             fetchUserSubsSample,
                             this.props.subs.length,
                             this.props.login.id);
                    break;
                }
                case 'subscribes': {
                    autoload(this.props.is_subscribes_fetching,
                             this.props.subscribes_empty,
                             this.props.dispatch,
                             fetchUserSubscribesSample,
                             this.props.subscribes.length,
                             this.props.login.id);
                    break;
                }
            }
        })
    }
}