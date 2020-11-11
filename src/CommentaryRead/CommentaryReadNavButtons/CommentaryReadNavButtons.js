import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import CommentaryReadHeader from '../CommentaryReadHeader/CommentaryReadHeader';
import PropTypes from 'prop-types';
import './CommentaryReadNavButtons.css';

const CommentaryReadNavButtons = (props) => {
    const { 
        book, 
        search,
        bookNumber,
        chapterNumber,
        sectionNumber, 
    } = props;

    const [showNav, setShowNav] = useState(false);

    let sBook;
    let sChapt;
    let sSection;

    const sArray = search.split('-');

    if (sArray.length === 1) {
        sBook = sArray[0];
    } else if (sArray.length === 2) {
        sBook = sArray[0];
        sChapt = `${sArray[0]}-${sArray[1]}`;
    } else {
        sBook = sArray[0];
        sChapt = `${sArray[0]}-${sArray[1]}`;
        sSection = `${sArray[0]}-${sArray[1]}-${sArray[2]}`;
    }

    if (!bookNumber || !search) {
        return (
            <div
                className='CommentaryReadNavButtons__outer-container'
            >
                <p>Error: Looks like something went wrong; check your connection and try again.</p>
            </div>
        );
    }

    return (
        <div
            className='CommentaryReadNavButtons__outer-container'
        >
            <div
                className='CommentaryReadNavButtons__mobile-container'
            >
                <CommentaryReadHeader 
                    bookNumber={bookNumber}
                    chapterNumber={chapterNumber}
                    sectionNumber={sectionNumber}
                    suffix='mobile'
                />
                <button
                    onClick={() => setShowNav(!showNav)}
                >
                    <FontAwesomeIcon 
                        className='CommentaryReadNavButtons__menu-button' 
                        icon={faBookOpen}  
                    />
                </button>
            </div>
            <nav className={`CommentaryReadNavButtons__nav ${!showNav ? 'hidden' : ''}`}>
                <div className='CommentaryReadNavButtons__container'>
                    <NavLink
                        className={`CommentaryReadNavButtons__button ${book.book_number === parseInt(sBook) ? 'selected' : ''}`}
                        to={`/commentary-read/${book.book_number}`}
                    >
                        Book {book.book_number}
                    </NavLink>
                </div>
                <div className='CommentaryReadNavButtons__container'>
                    {book.chapters
                        .sort((a, b) => parseInt(a.chapter_number.split('-')[1]) - parseInt(b.chapter_number.split('-')[1]))
                        .map(chapter => 
                            (
                                <NavLink
                                    className={`CommentaryReadNavButtons__button ${(sChapt && chapter.chapter_number === sChapt) ? 'selected' : ''}`}
                                    key={chapter.chapter_number}
                                    to={`/commentary-read/${chapter.chapter_number}`}
                                >
                                    Chapter {chapter.chapter_number.split('-')[1]}
                                </NavLink>
                            )
                        )
                    }
                </div>
                <div className='CommentaryReadNavButtons__container'>
                    {chapterNumber && 
                        book.chapters
                            .filter(c => c.chapter_number.split('-')[1] === chapterNumber)
                            .map(chapter => {
                                return chapter.sections
                                    .sort((a, b) => parseInt(a.section_number.split('-')[2]) - parseInt(b.section_number.split('-')[2]))
                                    .map(section => 
                                        <NavLink
                                            className={`CommentaryReadNavButtons__button ${(sSection && section.section_number === sSection) ? 'selected' : ''}`}
                                            key={`${chapter.chapter_number}.${section.section_number}`}
                                            to={`/commentary-read/${section.section_number}`}
                                        >
                                            {chapter.chapter_number.split('-')[1]}.{section.section_number.split('-')[2]}
                                        </NavLink>
                                        );
                                })
                                .flat()
                    }
                </div>
            </nav>
        </div>
    );
}

CommentaryReadNavButtons.defaultProps = { 
    book: {
        book_number: 0,
        chapters: [],
    }, 
    search: '',
    bookNumber: '',
    chapterNumber: '',
    sectionNumber: '', 
};

CommentaryReadNavButtons.propTypes = {
    book: PropTypes.shape({
        book_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        chapters: PropTypes.arrayOf(PropTypes.object),
    }),
    search: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bookNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    chapterNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sectionNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentaryReadNavButtons;