import React from 'react';
import { NavLink } from 'react-router-dom';
import './CommentaryReadNavButtons.css';

const CommentaryReadNavButtons = (props) => {

    const { book, search } = props;

    return (
        <nav className='CommentaryReadNavButtons__nav'>
            <div className='CommentaryReadNavButtons__container'>
                <NavLink
                    className={`CommentaryReadNavButtons__button ${search.includes(book.book_number) && 'selected'}`}
                    to={`/commentary-read/${book.book_number}`}
                >
                    Book {book.book_number}
                </NavLink>
            </div>
            <div className='CommentaryReadNavButtons__container'>
                {book.chapters.map(chapter => 
                    <NavLink
                        className={`CommentaryReadNavButtons__button ${search.includes(chapter.chapter_number) && 'selected'}`}
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
                            className={`CommentaryReadNavButtons__button ${search.includes(section.section_number) && 'selected'}`}
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