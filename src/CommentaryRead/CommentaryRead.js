import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentaryContext from '../context/CommentaryContext';
import CommentaryReadHeader from './CommentaryReadHeader/CommentaryReadHeader';
import CommentaryReadSectionView from './CommentaryReadSectionView/CommentaryReadSectionView';
import CommentaryReadChapter from './CommentaryReadChapter/CommentaryReadChapter';
import CommentaryReadNavButtons from './CommentaryReadNavButtons/CommentaryReadNavButtons';
import CommentaryService from '../services/commentary-service';
import './CommentaryRead.css';

const CommentaryRead = (props) => {

    const context = useContext(CommentaryContext);

    const [bookNumber, setBookNumber] = useState();
    const [chapterNumber, setChapterNumber] = useState();
    const [sectionNumber, setSectionNumber] = useState();
    const [book, setBook] = useState();
    const [chapter, setChapter] = useState();
    const [section, setSection] = useState();
    const [bookNotFound, setBookNotFound] = useState(false);
    const [chapterNotFound, setChapterNotFound] = useState(false);
    const [sectionNotFound, setSectionNotFound] = useState(false);

    const { location } = props.match.params;

    useEffect(() => {
        const locationArray = location.split('-');

        if (locationArray.length === 3) {
            setBookNumber(locationArray[0]);
            setChapterNumber(locationArray[1]);
            setSectionNumber(locationArray[2]);
        } else if (locationArray.length === 2) {
            setBookNumber(locationArray[0]);
            setChapterNumber(locationArray[1]);
            setSectionNumber('');
        } else {
            setBookNumber(locationArray[0]);
            setChapterNumber('');
            setSectionNumber('');
        }
    }, [location])

    useEffect(() => {
        if (bookNumber) {
            CommentaryService.getCommentaryByBook(bookNumber)
                .then(book => {
                    setBook(book);
                    setBookNotFound(false);
                })
                .catch(error => {
                    console.log(error);
                    setBookNotFound(true);
                });
        }
    }, [bookNumber, setBook, setBookNotFound]);

    useEffect(() => {
        if (chapterNumber && book) {
            const foundChapter = book.chapters.find(ch => ch.chapter_number === `${bookNumber}-${chapterNumber}`);
            if (foundChapter) {
                setChapter(foundChapter);
                setChapterNotFound(false);
            } else {
                setChapterNotFound(true);
            }
        } else {
            setChapter(null);
        }
    }, [bookNumber, chapterNumber, book, setChapter, setChapterNotFound]);

    useEffect(() => {
        if (sectionNumber && chapter && book) {
            const foundSection = chapter.sections.find(sec => sec.section_number === `${bookNumber}-${chapterNumber}-${sectionNumber}`);
            if (foundSection) {
                setSection(foundSection);
                setSectionNotFound(false);
            } else {
                setSectionNotFound(true);
            }
        } else {
            setSection(null);
        }
    }, [bookNumber, chapterNumber, sectionNumber, book, chapter, setSection, setSectionNotFound]);

    let htmlToDisplay;

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

    if (bookNotFound || chapterNotFound || sectionNotFound) {
        return (
            <section className='CommentaryRead__error section'>
                <h2>Error</h2>
                {bookNotFound && <p>We could not find book {bookNumber}.</p>}
                {chapterNotFound && <p>We could not find chapter {chapterNumber} of book {bookNumber}.</p>}
                {sectionNotFound && <p>We could not find section {sectionNumber} of chapter {chapterNumber} of book {bookNumber}.</p>}
                <p>Check the url and your connection and try again.</p>
            </section>
        );
    }

    if (book && chapter && section) {
        htmlToDisplay = (
            <section className='CommentaryRead__container section'>
                <CommentaryReadHeader 
                    bookNumber={bookNumber}
                    chapterNumber={chapterNumber}
                    sectionNumber={sectionNumber}
                    suffix='widescreen'
                />
                <CommentaryReadSectionView
                    bookNumber={bookNumber}
                    chapterNumber={chapterNumber} 
                    section={section}   
                />
            </section>
        );
    } else if (book && chapter) {
        htmlToDisplay = (
            <section className='CommentaryRead__container section'>
                <CommentaryReadHeader 
                    bookNumber={bookNumber}
                    chapterNumber={chapterNumber}
                    suffix='widescreen'
                />
                <CommentaryReadChapter 
                    chapter={chapter}
                    bookNumber={bookNumber}
                    chapterNumber={chapterNumber} 
                />
            </section>
        );
    } else if (book) {
        htmlToDisplay = (
            <section className='CommentaryRead__container section'>
                <CommentaryReadHeader 
                    bookNumber={bookNumber}
                    suffix='widescreen'
                />
                {book.chapters.map(chapter => 
                    <CommentaryReadChapter 
                        key={chapter.chapter_number}
                        chapter={chapter}
                        bookNumber={bookNumber}
                        chapterNumber={chapter.chapter_number} 
                    />)
                }
            </section>
        );
    }

    if (book) {
        return (
            <section className='section'>
                <CommentaryReadNavButtons 
                    book={book} 
                    search={location}
                    bookNumber={bookNumber}
                    chapterNumber={chapterNumber}
                    sectionNumber={sectionNumber}
                />
                {htmlToDisplay}
            </section>
        );
    }

    return (
        <section className='section'>
            <p>Loading...</p>
        </section>
    );
}

CommentaryRead.defaultProps = {
    match: {
        params: {
            location: '',
        },
    },
};

CommentaryRead.propTypes = {
    match: PropTypes.object,
};

export default CommentaryRead;
