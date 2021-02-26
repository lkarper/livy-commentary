import React, { useContext } from 'react';
import CommentaryContext from '../../context/CommentaryContext';

const FocusCommentary = (props) => {
    
    const context = useContext(CommentaryContext);
    
    const {
        focusCommentary,
        toggleFocusCommentary
    } = context;

    return (
        <button
            className='FocusCommentary__button'
            onClick={() => toggleFocusCommentary(!focusCommentary)}
        >
            {focusCommentary ? 'Show Latin' : 'Focus Commentary'}
        </button>
    );
}

export default FocusCommentary;