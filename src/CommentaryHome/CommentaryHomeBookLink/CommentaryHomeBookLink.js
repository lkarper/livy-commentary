import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentaryHomeChapterLink from '../CommentaryHomeChapterLink/CommentaryHomeChapterLink';
import './CommentaryHomeBookLink.css';

const CommentaryHomeBookLink = (props) => {

    const { book } = props;

    if (book.book_number === 0) {
        return (
            <div className='CommentaryHomeBookLink_book-link-container'>
                <h2>Error</h2>
                <p>Looks like something went wrong. Please check your connection and try again.</p>
            </div>    
        );
    }

    return (
        <div className='CommentaryHomeBookLink__book-link-container'>
            <h2>
                <Link 
                    className='CommentaryHomeBookLink__a'
                    to={`/commentary-read/${book.book_number}`}
                >
                    Book {book.book_number}
                </Link>
            </h2>
            {book.chapters
                .sort((a, b) => parseInt(a.chapter_number.split('-')[1]) - parseInt(b.chapter_number.split('-')[1]))
                .map(chapter => 
                    <CommentaryHomeChapterLink 
                        key={chapter.chapter_number} 
                        book_number={book.book_number} 
                        chapter={chapter} 
                    />
                )
            }
        </div>
    );
}

CommentaryHomeBookLink.defaultProps = {
    book: {
        book_number: 0,
        chapters: [],
    },
};

CommentaryHomeBookLink.propTypes = {
    book: PropTypes.shape({
        book_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        chapters: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default CommentaryHomeBookLink;