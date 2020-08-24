import React,  { useContext, useState, useEffect } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import './EditPage.css';
import AddNewBook from '../AddNewBook/AddNewBook';

const EditPage = (props) => {
    
    const context = useContext(CommentaryContext);

    const [bookNumber, setBookNumber] = useState();
    const [chapters, setChapters] = useState([]);
    const [nextBook, setNextBookNumber] = useState();
    const [addNewBook, setAddNewBook] = useState(false);

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
    }, [bookNumber])

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
                <fieldset>
                    <legend>Select a chapter to edit</legend>
                    {
                    }
                </fieldset>
            </form>
            {addNewBook && <AddNewBook setAddNewBook={setAddNewBook} nextBook={nextBook} />}
        </section>
    )
}

export default EditPage;
