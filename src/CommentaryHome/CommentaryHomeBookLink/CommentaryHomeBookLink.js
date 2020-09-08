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

export default CommentaryHomeBookLink;