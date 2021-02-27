import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainNav from './MainNav/MainNav';
import './Header.css';

const Header = (props) => {

    const { forceUpdate } = props;

    const [showNav, toggleShowNav] = useState(false);

    const handleLogout = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        forceUpdate();
    }

    return (
        <>
            <header className={`Header__header ${showNav ? 'show-nav' : ''}`}>
                <div
                    className='Header__top-container'
                >
                    <h1 className='Header__h1'>
                        <Link
                            to='/'
                            className='Header__h1-a'
                        >
                            The Third Decade Project
                        </Link>
                    </h1>
                    {TokenService.hasAuthToken() &&
                        <Link
                            to='/'
                            className='Header__link'
                            onClick={handleLogout}
                        >
                            Logout
                        </Link>
                    }
                    <button
                        className='Header__mobile-button'
                        onClick={() => toggleShowNav(!showNav)}
                    >
                        <FontAwesomeIcon
                            className='Header__burger' 
                            icon={faBars}
                        />
                    </button>
                    <div
                        className='Header__widescreen-nav-container'
                    >
                        <MainNav />
                    </div>
                </div>
                <div
                    className={`Header__mobile-nav-container ${showNav ? 'show' : 'hide'}`}
                >
                    <MainNav 
                        toggleShowNav={toggleShowNav}
                    />
                </div>
            </header>
        </>
    );
}

Header.defaultProps = {
    forceUpdate: () => {},
};

Header.propTypes = {
    forceUpdate: PropTypes.func,
};

export default Header;
