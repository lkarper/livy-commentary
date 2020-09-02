import React from 'react';
import { NavLink } from 'react-router-dom';
import './CommentaryReadNavButtons.css';

const CommentaryReadNavButtons = (props) => {

    const { book, search } = props;

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

    return (
        <nav className='CommentaryReadNavButtons__nav'>
            <div className='CommentaryReadNavButtons__container'>
                <NavLink
                    className={`CommentaryReadNavButtons__button ${book.book_number === parseInt(sBook) && 'selected'}`}
                    to={`/commentary-read/${book.book_number}`}
                >
                    Book {book.book_number}
                </NavLink>
            </div>
            <div className='CommentaryReadNavButtons__container'>
                {book.chapters.map(chapter => 
                    <NavLink
                        className={`CommentaryReadNavButtons__button ${(sChapt && chapter.chapter_number === sChapt) && 'selected'}`}
                        key={chapter.chapter_number}
                        to={`/commentary-read/${chapter.chapter_number}`}
                    >
                        Chapter {chapter.chapter_number.split('-')[1]}
                    </NavLink>
                    )
                }
            </div>
            <div className='CommentaryReadNavButtons__container'>
                {book.chapters.map(chapter => {
                    return chapter.sections.map(section => 
                        <NavLink
                            className={`CommentaryReadNavButtons__button ${(sSection && section.section_number === sSection) && 'selected'}`}
                            key={`${chapter.chapter_number}.${section.section_number}`}
                            to={`/commentary-read/${section.section_number}`}
                        >
                            {chapter.chapter_number.split('-')[1]}.{section.section_number.split('-')[2]}
                        </NavLink>
                        );
                }).flat()}
            </div>
        </nav>
    );
}

export default CommentaryReadNavButtons;