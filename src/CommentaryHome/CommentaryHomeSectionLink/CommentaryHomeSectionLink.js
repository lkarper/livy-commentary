import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CommentaryHomeSectionLink.css';

const CommentaryHomeSectionLink = (props) => {
    const { section } = props;

    return (
        <li>
            <Link 
                className='CommentaryHomeSectionLink__a'
                to={`/commentary-read/${section.section_number}`}
            >
                §{section.section_number}
            </Link>
        </li>
    );
}

CommentaryHomeSectionLink.defaultProps = {
    section: {
        section_number: 0,
    },
};

CommentaryHomeSectionLink.propTypes = {
    section: PropTypes.shape({
        section_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
};

export default CommentaryHomeSectionLink;