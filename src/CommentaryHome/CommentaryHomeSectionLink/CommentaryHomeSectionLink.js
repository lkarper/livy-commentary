import React from 'react';
import { Link } from 'react-router-dom';

const CommentaryHomeSectionLink = (props) => {
    const { section, book_number, chapter_number } = props;

    return (
        <div>
            <Link 
                to={`/commentary-read?book=${book_number}&chapter=${chapter_number}&section=${section.section_number}`}
            >
                §{section.section_number}
            </Link>
        </div>
    );
}

export default CommentaryHomeSectionLink;