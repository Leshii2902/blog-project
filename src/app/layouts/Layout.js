import React from 'react';

import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';

export default class Layout extends React.Component {
    constructor() {
        super(...arguments);
        this.backs = {
            '/': 'back_main',
            '/posts': 'back_posts',
            '/blogs': 'back_blogs',
            '/ratings': 'back_ratings',
            '/about': 'back_about',
            '/user': 'back_user',
            '/post': 'back_post',
            '/login': 'back_login',
            '/cabinet': 'back_cabinet',
            '/register': 'back_register',
        }
    }

    render () {
        let location = window.location.pathname;
        let route = location.split('/').pop();
        if (/[\d]/g.test(route)) {
            let count = route.length + 1;
            location = location.slice(0, -(count));
        }
        return (
            <main>
                <div className="main_background"/>
                <Nav/>
                <div className={`content ${this.backs[location]}`}>
                     {this.props.children}
                     <div className="empty_down"/>
                </div>
                <Footer/>
            </main>
        );
    }
}