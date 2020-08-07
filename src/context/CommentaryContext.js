import React, { useState, createContext} from 'react';
import STORE from '../STORE';

const CommentaryContext = createContext({
    data: [],
});

export default CommentaryContext;

export const CommentaryProvider = (props) => {
    const [data, setData] = useState(STORE);

    const value = {
        data,
    };

    return (
        <CommentaryContext.Provider value={value}>
            {props.children}
        </CommentaryContext.Provider>
    );
}