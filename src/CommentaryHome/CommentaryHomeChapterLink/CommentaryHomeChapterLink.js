import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentaryHomeSectionLink from '../CommentaryHomeSectionLink/CommentaryHomeSectionLink';
import './CommentaryHomeChapterLink.css';

const CommentaryHomeChapterLink = (props) => {
    const { chapter, book_number } = props;

    if (book_number === 0 || chapter.chapter_number === 0) {
        return (
            <div className='CommentaryHomeChapterLink__chapter-link-container'>
                <h3>Error</h3>
                <p>Looks like something went wrong. Check your connection and try again.</p>        
            </div>
        );
    }

    return (
        <div className='CommentaryHomeChapterLink__chapter-link-container'>
            <h3>
                <Link 
                    to={`/commentary-read/${chapter.chapter_number}`}
                >
                    Chapter {chapter.chapter_number}: {chapter.chapter_title}
                </Link>
            </h3>
            <ul>
                {chapter.sections
                    .sort((a, b) => parseInt(a.section_number.split('-')[2]) - parseInt(b.section_number.split('-')[2]))
                    .map(section => 
                        <CommentaryHomeSectionLink 
                            key={section.section_number} 
                            book_number={book_number} 
                            chapter_number={chapter.chapter_number} 
                            section={section} 
                        />
                    )
                }
            </ul>
        </div>
    );
}

CommentaryHomeChapterLink.defaultProps = {
    book_number: 0,
    chapter: {
        chapter_number: 0,
        sections: [],        
    },
};

CommentaryHomeChapterLink.propTypes = {
    book_number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    chapter: PropTypes.shape({
        chapter_number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sections: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default CommentaryHomeChapterLink;