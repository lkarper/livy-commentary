import React from 'react';
import { Link } from 'react-router-dom';

const CommentaryHomeSectionLink = (props) => {
    const { section } = props;

    return (
        <div>
            <Link>§{section.section_number}</Link>
        </div>
    );
}

export default CommentaryHomeSectionLink;