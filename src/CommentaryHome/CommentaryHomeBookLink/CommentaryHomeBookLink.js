import React from 'react';
import { Link } from 'react-router-dom';
import CommentaryHomeChapterLink from '../CommentaryHomeChapterLink/CommentaryHomeChapterLink';

const CommentaryHomeBookLink = (props) => {

    const { book } = props;

    return (
        <div>
            <Link>Book {book.book_number}</Link>
            {book.chapters.map(chapter => <CommentaryHomeChapterLink key={chapter.chapter_number} chapter={chapter} />)}
        </div>
    );
}

export default CommentaryHomeBookLink;