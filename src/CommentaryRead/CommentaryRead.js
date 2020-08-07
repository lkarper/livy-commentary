import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CommentaryContext from '../context/CommentaryContext';
import CommentaryReadSectionView from './CommentaryReadSectionView/CommentaryReadSectionView';
import CommentaryReadChapter from './CommentaryReadChapter/CommentaryReadChapter';

const CommentaryRead = (props) => {

    const context = useContext(CommentaryContext);
    const { data } = context;

    const [search, setSearch] = useState('');
    const [bookNumber, setBookNumber] = useState();
    const [chapterNumber, setChapterNumber] = useState();
    const [sectionNumber, setSectionNumber] = useState();
    const [book, setBook] = useState();
    const [chapter, setChapter] = useState();
    const [section, setSection] = useState();
    const [bookNotFound, setBookNotFound] = useState(false);
    const [chapterNotFound, setChapterNotFound] = useState(false);
    const [sectionNotFound, setSectionNotFound] = useState(false);

    useEffect(() => {
        if (search !== props.location.search) {
            setBookNumber('');
            setChapterNumber('');
            setSectionNumber('');
            setBook('');
            setChapter('');
            setSection('');
            setSearch(props.location.search);
        }
    }, [props, search, setSearch]);

    useEffect(() => {
        
        

        if (search) {
            search
                .slice(1)
                .split('&')
                .forEach(query => {
                    const param = query.split('=')[0];
                    const value = query.split('=')[1];
                    if (param === 'book') {
                        setBookNumber(parseInt(value));
                    }
                    if (param === 'chapter') {
                        setChapterNumber(parseInt(value))
                    }
                    if (param === 'section') {
                        setSectionNumber(parseInt(value));
                    }                    
                });
        }
    }, [search, setBookNumber, setChapterNumber, setSectionNumber]);

    useEffect(() => {
        if (bookNumber) {
            const foundBook = data.find(bk => bk.book_number === bookNumber);
            if (foundBook) {
                setBook(foundBook);
                setBookNotFound(false);
            } else {
                setBookNotFound(true);
            }
        }
    }, [bookNumber, setBook, setBookNotFound]);

    useEffect(() => {
        if (chapterNumber && book) {
            const foundChapter = book.chapters.find(ch => ch.chapter_number === chapterNumber);
            if (foundChapter) {
                setChapter(foundChapter);
                setChapterNotFound(false);
            } else {
                setChapterNotFound(true);
            }
        }
    }, [bookNumber, chapterNumber, book, setChapter, setChapterNotFound]);

    useEffect(() => {
        if (sectionNumber && chapter && book) {
            const foundSection = chapter.sections.find(sec => sec.section_number === sectionNumber);
            if (foundSection) {
                setSection(foundSection);
                setSectionNotFound(false);
            } else {
                setSectionNotFound(true);
            }
        }
    }, [bookNumber, chapterNumber, sectionNumber, book, chapter, setSection, setSectionNotFound]);

    let htmlToDisplay;

    const bookLink = (
        <Link 
            to={`/commentary-read?book=${bookNumber}`}
        >
            Book {bookNumber}
        </Link>
    );

    const chapterLink = (
        <Link
            to={`/commentary-read?book=${bookNumber}&chapter=${chapterNumber}`}
        >
            Chapter {chapterNumber}
        </Link>
    );

    if (book && chapter && section) {
        htmlToDisplay = (
            <section className='CommentaryRead__container section'>
                <header>
                    <h2>{bookLink}{' > '}{chapterLink}{' > '}§{section.section_number}</h2>
                </header>
                <CommentaryReadSectionView 
                    section={section}   
                />
            </section>
        );
    } else if (book && chapter) {
        htmlToDisplay = (
            <section className='CommentaryRead__container section'>
                <header>
                    <h2>{bookLink}{' > '}Chapter {chapter.chapter_number}</h2>
                </header>
                <CommentaryReadChapter 
                    chapter={chapter}
                />
            </section>
        );
    } else if (book) {
        htmlToDisplay = (
            <section className='CommentaryRead__container section'>
                <header>
                    <h2>Book {bookNumber}</h2>
                </header>
                {book.chapters.map(chapter => 
                    <CommentaryReadChapter 
                        key={chapter.chapter_number}
                        chapter={chapter}
                    />)
                }
            </section>
        );
    }

    if (book) {
        return (
            <section className='CommentaryRead__container section'>
                {htmlToDisplay}
            </section>
        );
    }

    return (
        <section className='CommentaryRead__container section'>
            <p>Loading...</p>
        </section>
    );
}

export default CommentaryRead;