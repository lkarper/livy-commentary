import React, { useState, useEffect, createContext} from 'react';
import CommentaryService from '../services/commentary-service';

const CommentaryContext = createContext({
    homePageLinkNumbers: [],
    addNewBook: () => {},
});

export default CommentaryContext;

export const CommentaryProvider = (props) => {

    const [homePageLinkNumbers, setHomePageLinkNumbers] = useState([]);

    useEffect(() => {
        CommentaryService.getHomePageLinkNumbers()
            .then(numbers => {
                setHomePageLinkNumbers(numbers)
            })
            .catch(error => {
                console.log(error);
            });
    }, [props]);

    const addNewBook = (newBook) => {
        const newHomePageLinkNumbers = [...homePageLinkNumbers, newBook];
        setHomePageLinkNumbers(newHomePageLinkNumbers);
    }

    const value = {
        homePageLinkNumbers,
        addNewBook,
    };

    return (
        <CommentaryContext.Provider value={value}>
            {props.children}
        </CommentaryContext.Provider>
    );
}