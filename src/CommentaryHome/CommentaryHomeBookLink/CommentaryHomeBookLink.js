import React from 'react';
import { Link } from 'react-router-dom';
import CommentaryHomeChapterLink from '../CommentaryHomeChapterLink/CommentaryHomeChapterLink';

const CommentaryHomeBookLink = (props) => {

    const { book } = props;

    return (
        <div>
            <Link 
                to={`/commentary-read?book=${book.book_number}`}
            >
                Book {book.book_number}
            </Link>
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