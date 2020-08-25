import React, { useState, useEffect, createContext} from 'react';
import CommentaryService from '../services/commentary-service';

const CommentaryContext = createContext({
    homePageLinkNumbers: [],
    addNewBook: () => {},
    addNewChapter: () => {},
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

    const addNewChapter = (newChapter) => {
        const bookToEdit = homePageLinkNumbers.find(b => b.book_number === newChapter.book_number);
        const { chapters, ...rest } = bookToEdit;
        const updatedBook = {
            ...rest,
            chapters: [
                ...chapters,
                newChapter
            ],
        };
        const newHomePageLinkNumbers = [
            ...homePageLinkNumbers.filter(b => b.book_number !== newChapter.book_number),
            updatedBook
        ]
        setHomePageLinkNumbers(newHomePageLinkNumbers.sort((a, b) => a.book_number - b.book_number));
    }

    const value = {
        homePageLinkNumbers,
        addNewBook,
        addNewChapter
    };

    return (
        <CommentaryContext.Provider value={value}>
            {props.children}
        </CommentaryContext.Provider>
    );
}