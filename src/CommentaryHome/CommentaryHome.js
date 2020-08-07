import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CommentaryContext from '../context/CommentaryContext';
import CommentaryHomeBookLink from './CommentaryHomeBookLink/CommentaryHomeBookLink';

const CommentaryHome = (props) => {

    const context = useContext(CommentaryContext);
    const { data } = context;

    return (
        <div>
            {data.map(book => <CommentaryHomeBookLink key={book.book_number} book={book} />)}
        </div>
    );
}

export default CommentaryHome;