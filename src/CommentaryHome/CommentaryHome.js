import React, { useContext } from 'react';
import CommentaryContext from '../context/CommentaryContext';
import CommentaryHomeBookLink from './CommentaryHomeBookLink/CommentaryHomeBookLink';
import './CommentaryHome.css';

const CommentaryHome = (props) => {

    const context = useContext(CommentaryContext);
    const { homePageLinkNumbers } = context;

    if (homePageLinkNumbers.length === 0) {
        return (
            <div className="CommentaryHome__book-link-container">
                <p className="CommentaryHome__loading p">Loading...</p>
            </div>
        );
    }

    return (
        <div className='CommentaryHome__book-link-container'>
            {homePageLinkNumbers.map(book => <CommentaryHomeBookLink key={book.book_number} book={book} />)}
        </div>
    );
}

export default CommentaryHome;
