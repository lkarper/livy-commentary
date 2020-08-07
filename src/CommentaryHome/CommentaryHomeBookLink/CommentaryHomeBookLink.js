import React from 'react';
import { Link } from 'react-router-dom';
import CommentaryHomeChapterLink from '../CommentaryHomeChapterLink/CommentaryHomeChapterLink';
import './CommentaryHomeBookLink.css';

const CommentaryHomeBookLink = (props) => {

    const { book } = props;

    return (
        <div className='CommentaryHomeBookLink_book-link-container'>
            <h2>
                <Link 
                    to={`/commentary-read?book=${book.book_number}`}
                >
                    Book {book.book_number}
                </Link>
            </h2>
            {book.chapters.map(chapter => 
                <CommentaryHomeChapterLink 
                    key={chapter.chapter_number} 
                    book_number={book.book_number} 
                    chapter={chapter} 
                />)
            }
        </div>
    );
}

export default CommentaryHomeBookLink;