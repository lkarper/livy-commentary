import React from 'react';
import { Link } from 'react-router-dom';
import CommentaryHomeSectionLink from '../CommentaryHomeSectionLink/CommentaryHomeSectionLink';

const CommentaryHomeChapterLink = (props) => {
    const { chapter, book_number } = props;

    return (
        <div>
            <Link 
                to={`/commentary-read?book=${book_number}&chapter=${chapter.chapter_number}`}
            >
                Chapter {chapter.chapter_number}: {chapter.chapter_title}
            </Link>
            {chapter.sections.map(section => 
                <CommentaryHomeSectionLink 
                    key={section.section_number} 
                    book_number={book_number} 
                    chapter_number={chapter.chapter_number} 
                    section={section} 
                />)
            }
        </div>
    );
}

export default CommentaryHomeChapterLink;