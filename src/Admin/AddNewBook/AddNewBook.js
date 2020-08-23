import React, { useState, useContext } from 'react';
import CommentaryContext from '../../context/CommentaryContext';
import CommentaryService from '../../services/commentary-service';

const AddNewBook = (props) => {

    const context = useContext(CommentaryContext);

    const [newBookNumber, setNewBookNumber] = useState();

    return (
        <form>
            <label htmlFor='new-book-number'>New book number: </label>
            <input
                type='number'
                id='new-book-number'
                value={newBookNumber}
                onChange={(e)  => setNewBookNumber(e.target.value)}
            />
        </form>
    )

}

export default AddNewBook;