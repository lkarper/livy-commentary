import React, { useContext } from 'react';
import CommentaryContext from '../context/CommentaryContext';
import CommentaryHomeBookLink from './CommentaryHomeBookLink/CommentaryHomeBookLink';
import './CommentaryHome.css';

const CommentaryHome = (props) => {

    const context = useContext(CommentaryContext);
    const { data } = context;

    return (
        <div className='CommentaryHome__book-link-container'>
            {data.map(book => <CommentaryHomeBookLink key={book.book_number} book={book} />)}
        </div>
    );
}

export default CommentaryHome;