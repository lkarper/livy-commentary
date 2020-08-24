import React, { useState, useContext } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import CommentaryService from '../../services/commentary-service';

const AddNewBook = (props) => {

    const context = useContext(CommentaryContext);

    const [newBookNumber, setNewBookNumber] = useState(props.nextBook);

    const handleSubmit = (event) => {
        event.preventDefault();
        CommentaryService.addNewBook(newBookNumber)
            .then(book => {
                context.addNewBook(book);
                props.setAddNewBook(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label htmlFor='new-book-number'>New book number: </label>
            <input
                type='number'
                id='new-book-number'
                value={newBookNumber}
                onChange={(e)  => setNewBookNumber(e.target.value)}
            />
            <button
                type='submit'
                disabled={!newBookNumber}
            >
                Submit
            </button>
        </form>
    )

}

export default AddNewBook;