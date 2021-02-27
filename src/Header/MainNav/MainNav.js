import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';
 
const MainNav = (props) => {
    return (
        <nav
            className='MainNav__nav'
        >
            <NavLink
                to='/maps'
                className='MainNav__nav-link'
            >
                Maps
            </NavLink>
            <NavLink
                to='/glossary'
                className='MainNav__nav-link'
            >
                Glossary
            </NavLink>
            <NavLink
                to='/external-resources'
                className='MainNav__nav-link'
            >
                External Resources
            </NavLink>
            <NavLink
                to='/about'
                className='MainNav__nav-link'
            >
                About
            </NavLink>
        </nav>
    );
};

export default MainNav;