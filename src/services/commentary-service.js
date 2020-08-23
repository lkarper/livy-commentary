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

}

export default CommentaryService;