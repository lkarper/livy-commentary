import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className='Header__header'>
            <h1>
                <Link
                    to='/'
                >
                    Commentarius de bello Punico
                </Link>
            </h1>
        </header>
    );
}

export default Header;