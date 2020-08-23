import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const CommentaryReadComment = (props) => {

    const { comment } = props;

    // if (Object.keys(commentArray.links) !== 0) {
    //     Object.keys(commentArray.links).forEach(linkNumber => {
    //         const anchorString = `<a href="${commentArray.links[linkNumber].url}" target="_blank">${commentArray.links[linkNumber].title}</a>`;
    //         text = text.replace(linkNumber, anchorString);
    //     });
    // }

    return (
        <div>
            <h3>{comment.tag}</h3>
            {ReactHtmlParser(comment.comment)}
        </div>    
    );
}

export default CommentaryReadComment;