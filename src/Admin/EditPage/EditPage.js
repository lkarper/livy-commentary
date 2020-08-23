import React,  { useContext, useState } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import './EditPage.css';
import AddNewBook from '../AddNewBook/AddNewBook';

const EditPage = (props) => {
    
    const context = useContext(CommentaryContext);

    const [bookNumber, setBookNumber] = useState();
    const [addNewBook, setAddNewbook] = useState(false);

    const commNumbers = [...context.homePageLinkNumbers];

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
                        onClick={() => setAddNewbook(!addNewBook)}
                    >
                        {addNewBook ? 'Nevermind' : 'Add a new book'}
                    </button>
                    {addNewBook && <AddNewBook />}
                </fieldset>
            </form>
        </section>
    )
}

export default EditPage;
