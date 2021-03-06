import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

@connect((store) => {
    return {
        login: store.login.login,
    }
})
export default class LoginPanel extends React.Component {
    constructor() {
        super(...arguments);
    }

    // скрыть меню логина (Личный кабинет, Выход)
    hideMenu(event) {
        let label = document.querySelector('.login__panel__label');
        let input = document.querySelector('#login__panel_input');
        if (event.target !== label && event.target !== input) {
            input.checked = false;
        }
    }

    render() {
        if (!this.props.login.id) {
            return <div className="login__links">
                <NavLink to='/login' className={`nav_menu__link login__link`}>Вход на сайт</NavLink>
                <NavLink to='/register' className={`nav_menu__link login__link`}>Регистрация</NavLink>
            </div>
        } else {
            return <div className="login__panel_menu">
                <label htmlFor="login__panel_input" className="login__panel__label">
                    <i className="fa fa-user-o" aria-hidden="true"/>&nbsp;{this.props.login.login}
                </label>
                <input type="checkbox" id="login__panel_input"/>
                <div className="login__menu">
                    <NavLink to='/cabinet' className={`nav_menu__link login__link`}>
                        Личный кабинет
                    </NavLink>
                    <NavLink to='/unlogged' className={`nav_menu__link login__link`}>
                        Выход
                    </NavLink>
                </div>
            </div>
        }
    }

    componentDidUpdate() {
        // скрытие меню логина при клике в любом месте экрана
        document.body.removeEventListener('click', this.hideMenu);
        if (this.props.login.id) {
            document.body.addEventListener('click', this.hideMenu);
        }
    }
}
