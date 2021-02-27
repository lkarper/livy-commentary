import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';
 
const MainNav = (props) => {

    const { toggleShowNav } = props;

    return (
        <nav
            className='MainNav__nav'
        >
            <NavLink
                to='/commentary-read'
                className='MainNav__nav-link'
                onClick={() => toggleShowNav()}
            >
                Commentary
            </NavLink>
            <NavLink
                to='/maps'
                className='MainNav__nav-link'
                onClick={() => toggleShowNav()}
            >
                Maps
            </NavLink>
            <NavLink
                to='/glossary'
                className='MainNav__nav-link'
                onClick={() => toggleShowNav()}
            >
                Glossary
            </NavLink>
            <NavLink
                to='/external-resources'
                className='MainNav__nav-link'
                onClick={() => toggleShowNav()}
            >
                External Resources
            </NavLink>
            <NavLink
                to='/about'
                className='MainNav__nav-link'
                onClick={() => toggleShowNav()}
            >
                About
            </NavLink>
        </nav>
    );
};

MainNav.defaultProps = {
    toggleShowNav: () => {},
};

export default MainNav;