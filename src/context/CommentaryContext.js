import React, { useState, useEffect, createContext} from 'react';
import CommentaryService from '../services/commentary-service';

const CommentaryContext = createContext({
    homePageLinkNumbers: [],
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

    const value = {
        homePageLinkNumbers
    };

    return (
        <CommentaryContext.Provider value={value}>
            {props.children}
        </CommentaryContext.Provider>
    );
}