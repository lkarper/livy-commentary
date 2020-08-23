import React from 'react';
import { Link } from 'react-router-dom';

const CommentaryHomeSectionLink = (props) => {
    const { section } = props;

    return (
        <li>
            <Link 
                to={`/commentary-read/${section.section_number}`}
            >
                §{section.section_number}
            </Link>
        </li>
    );
}

export default CommentaryHomeSectionLink;