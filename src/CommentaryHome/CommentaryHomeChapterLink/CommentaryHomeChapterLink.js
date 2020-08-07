import React from 'react';
import { Link } from 'react-router-dom';
import CommentaryHomeSectionLink from '../CommentaryHomeSectionLink/CommentaryHomeSectionLink';
import './CommentaryHomeChapterLink.css';

const CommentaryHomeChapterLink = (props) => {
    const { chapter, book_number } = props;

    return (
        <div className='CommentaryHomeChapterLink__chapter-link-container'>
            <h3>
                <Link 
                    to={`/commentary-read?book=${book_number}&chapter=${chapter.chapter_number}`}
                >
                    Chapter {chapter.chapter_number}: {chapter.chapter_title}
                </Link>
            </h3>
            <ul>
                {chapter.sections.map(section => 
                    <CommentaryHomeSectionLink 
                        key={section.section_number} 
                        book_number={book_number} 
                        chapter_number={chapter.chapter_number} 
                        section={section} 
                    />)
                }
            </ul>
        </div>
    );
}

export default CommentaryHomeChapterLink;