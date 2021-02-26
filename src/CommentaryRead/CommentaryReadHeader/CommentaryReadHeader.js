import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FocusCommentary from '../FocusCommentary/FocusCommentary';
import './CommentaryReadHeader.css';

const CommentaryReadHeader = (props) => {
    const {
        bookNumber,
        chapterNumber,
        sectionNumber,
        suffix,
    } = props;

    const bookLink = (
        <Link
            className='CommentaryReadHeader__a' 
            to={`/commentary-read/${bookNumber}`}
        >
            Book {bookNumber}
        </Link>
    );

    const chapterLink = (
        <Link
            className='CommentaryReadHeader__a'
            to={`/commentary-read/${bookNumber}-${chapterNumber}`}
        >
            Chapter {chapterNumber}
        </Link>
    );

    if (bookNumber && chapterNumber && sectionNumber) {
        return (
            <header
                className={`CommentaryReadHeader__header ${suffix}`}
            >
                <h2>{bookLink}{' > '}{chapterLink}{' > '}§{sectionNumber}</h2>
                <FocusCommentary />
            </header>
        );
    } else if (bookNumber && chapterNumber) {
        return (
            <header
                className={`CommentaryReadHeader__header ${suffix}`}
            >
                <h2>{bookLink}{' > '}Chapter {chapterNumber}</h2>
                <FocusCommentary />
            </header>
        );
    }

    return (
        <header
            className={`CommentaryReadHeader__header ${suffix}`}
        >
            <h2>Book {bookNumber}</h2>
            <FocusCommentary />
        </header>
    );

}

CommentaryReadHeader.defaultProps = {
    bookNumber: '',
    chapterNumber: '',
    sectionNumber: '',
    suffix: '',
};

CommentaryReadHeader.propTypes = {
    bookNumber: PropTypes.string,
    chapterNumber: PropTypes.string,
    sectionNumber: PropTypes.string,
    suffix: PropTypes.string,
};

export default CommentaryReadHeader;
