import React from 'react';
import { Link } from 'react-router-dom';
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
            to={`/commentary-read/${bookNumber}`}
        >
            Book {bookNumber}
        </Link>
    );

    const chapterLink = (
        <Link
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
            </header>
        );
    } else if (bookNumber && chapterNumber) {
        return (
            <header
                className={`CommentaryReadHeader__header ${suffix}`}
            >
                <h2>{bookLink}{' > '}Chapter {chapterNumber}</h2>
            </header>
        );
    }

    return (
        <header
            className={`CommentaryReadHeader__header ${suffix}`}
        >
            <h2>Book {bookNumber}</h2>
        </header>
    );

}

CommentaryReadHeader.defaultProps = {
    suffix: '',
}

export default CommentaryReadHeader;
