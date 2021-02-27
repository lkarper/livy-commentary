import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = (props) => {
    return (
        <section
            className='Landing__outer-container'
        >
            <h2>Welcome to <em>The Third Decade Project</em>{' '}!</h2>
            <Link
                to='/commentary-read'
            >
                See the Commentary
            </Link>
        </section>
    );
}

export default Landing;