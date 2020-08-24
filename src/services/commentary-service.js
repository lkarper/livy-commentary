import TokenService from './token-service';
import config from '../config';

const CommentaryService = {
    getHomePageLinkNumbers() {
        return fetch(`${config.API_ENDPOINT}/sections/numbers`)
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    getCommentaryByBook(bookNumber) {
        return fetch(`${config.API_ENDPOINT}/books/${bookNumber}`)
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    addNewBook(book_number) {
        return fetch(`${config.API_ENDPOINT}/books`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                book_number
            }),
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()    
            );
    },

}

export default CommentaryService;