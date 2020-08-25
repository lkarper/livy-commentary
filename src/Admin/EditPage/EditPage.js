import React,  { useContext, useState, useEffect } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import './EditPage.css';
import AddNewBook from '../AddNewBook/AddNewBook';
import AddNewChapter from '../AddNewChapter/AddNewChapter';
import CommentaryService from '../../services/commentary-service';

const EditPage = (props) => {
    
    const context = useContext(CommentaryContext);

    const [bookNumber, setBookNumber] = useState();
    const [chapters, setChapters] = useState([]);
    const [chapterNumber, setChapterNumber] = useState();
    const [sections, setSections] = useState([]);
    const [nextBook, setNextBookNumber] = useState();
    const [addNewBook, setAddNewBook] = useState(false);
    const [addNewChapter, setAddNewChapter] = useState(false);

    const commNumbers = [...context.homePageLinkNumbers];

    useEffect(() => {
        const lastBook = context.homePageLinkNumbers.length 
            ? context.homePageLinkNumbers.map(book => parseInt(book.book_number)).sort((a, b) => a-b).pop()
            : 0;
        setNextBookNumber(lastBook + 1);
    }, [context.homePageLinkNumbers, setNextBookNumber]);

    useEffect(() => {
        if (bookNumber) {
            const chapters = context.homePageLinkNumbers
                .find(book => book.book_number === bookNumber)
                .chapters;
            setChapters(chapters);
        }
    }, [bookNumber, setChapters, context.homePageLinkNumbers]);

    useEffect(() => {
        if (chapterNumber) {
            CommentaryService.fetchSectionsByChapterNumber(chapterNumber)
                .then(chapter => {
                    setSections(chapter.sections);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [chapterNumber]);

    return (
        <section className='EditPage__outer-section'>
            <h2>Edit</h2>
            <form>
                <fieldset>
                    <legend>Select a book to edit</legend>
                    {commNumbers.map(book => {
                        return (
                            <div key={book.book_number}>
                                <input 
                                    type='radio'
                                    id={`book-${book.book_number}`}
                                    name='book'
                                    value={book.book_number}
                                    onChange={(e) => setBookNumber(parseInt(e.target.value))}
                                    checked={bookNumber === book.book_number}
                                />
                                <label htmlFor={`book-${book.book_number}`}>Book {book.book_number}</label>
                            </div>
                        );
                    })}
                    <button
                        type='button'
                        onClick={() => setAddNewBook(!addNewBook)}
                    >
                        {addNewBook ? 'Nevermind' : 'Add a new book'}
                    </button>
                </fieldset>
                {bookNumber && 
                    <fieldset>
                        <legend>Select a chapter to edit</legend>
                        {
                            chapters.map(chapter => {
                                return (
                                    <div>
                                        <input
                                            type='radio'
                                            name='chapter'
                                            id={`chapter-${chapter.chapter_number}`}
                                            value={chapter.chapter_number}
                                            onChange={(e) => setChapterNumber(e.target.value)}
                                            checked={chapterNumber === chapter.chapter_number}
                                        />
                                        <label
                                            htmlFor={`chapter-${chapter.chapter_number}`}
                                        >
                                            Chapter {chapter.chapter_number.split('-')[1]}
                                        </label>
                                    </div>
                                )
                            })
                        }
                        <button 
                            type='button'
                            onClick={() => setAddNewChapter(!addNewChapter)}
                        >
                            {addNewChapter ? 'Nevermind' : 'Add new chapter'}
                        </button>
                    </fieldset>
                }
            </form>
            {addNewBook && <AddNewBook setAddNewBook={setAddNewBook} nextBook={nextBook} />}
            {addNewChapter && <AddNewChapter setAddNewChapter={setAddNewChapter} bookNumber={bookNumber} nextChapter={chapters.length + 1}/>}
            <form>
                {chapterNumber && sections.length === 0
                    ? <p>Loading sections...</p>
                    : <></>
                }
                {chapterNumber && sections.length !== 0
                    ?
                        <fieldset>
                            
                            <fieldset>
                                <legend>Select a section to edit</legend>
                            </fieldset>
                        </fieldset>
                    : 
                        <></>
                }
            </form>
        
        </section>
    )
}

export default EditPage;
