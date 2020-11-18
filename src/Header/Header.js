import React from 'react';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

const Header = (props) => {

    const { forceUpdate } = props;

    const handleLogout = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        forceUpdate();
    }

    return (
        <header className='Header__header'>
            <h1>
                <Link
                    to='/'
                >
                    The Third Decade Project
                </Link>
            </h1>
            {TokenService.hasAuthToken() &&
                <Link
                    to='/'
                    className="Header__link"
                    onClick={handleLogout}
                >
                    Logout
                </Link>
            }
        </header>
    );
}

Header.defaultProps = {
    forceUpdate: () => {},
};

Header.propTypes = {
    forceUpdate: PropTypes.func,
};

export default Header;