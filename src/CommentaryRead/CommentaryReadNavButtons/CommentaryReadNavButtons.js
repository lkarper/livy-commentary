import React from 'react';
import { NavLink } from 'react-router-dom';
import './CommentaryReadNavButtons.css';

const CommentaryReadNavButtons = (props) => {

    const { book, search } = props;

    return (
        <nav className='CommentaryReadNavButtons__nav'>
            <div className='CommentaryReadNavButtons__container'>
                <NavLink
                    className={`CommentaryReadNavButtons__button ${search.includes(`book=${book.book_number}`) && 'selected'}`}
                    to={`/commentary-read?book=${book.book_number}`}
                >
                    Book {book.book_number}
                </NavLink>
            </div>
            <div className='CommentaryReadNavButtons__container'>
                {book.chapters.map(chapter => 
                    <NavLink
                        className={`CommentaryReadNavButtons__button ${(search.includes(`book=${book.book_number}`) && search.includes(`chapter=${chapter.chapter_number}`)) && 'selected'}`}
                        key={chapter.chapter_number}
                        to={`/commentary-read?book=${book.book_number}&chapter=${chapter.chapter_number}`}
                    >
                        Chapter {chapter.chapter_number}
                    </NavLink>
                    )
                }
            </div>
            <div className='CommentaryReadNavButtons__container'>
                {book.chapters.map(chapter => {
                    return chapter.sections.map(section => 
                        <NavLink
                            className={`CommentaryReadNavButtons__button ${(search.includes(`book=${book.book_number}`) && search.includes(`chapter=${chapter.chapter_number}`) && search.includes(`section=${section.section_number}`)) && 'selected'}`}
                            key={`${chapter.chapter_number}.${section.section_number}`}
                            to={`/commentary-read?book=${book.book_number}&chapter=${chapter.chapter_number}&section=${section.section_number}`}
                        >
                            {chapter.chapter_number}.{section.section_number}
                        </NavLink>
                        );
                }).flat()}
            </div>
        </nav>
    );
}

export default CommentaryReadNavButtons;