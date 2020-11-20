import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import './CommentaryReadComment.css';

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
            <h3 className='CommentaryReadComment__h3'><q>{comment.tag}</q></h3>
            <p>{ReactHtmlParser(comment.comment)}</p>
        </div>    
    );
}

CommentaryReadComment.defaultProps = {
    comment: {
        tag: '',
        comment: '',
    },
};

CommentaryReadComment.propTypes = {
    comment: PropTypes.shape({
        tag: PropTypes.string,
        comment: PropTypes.string,
    }),
};

export default CommentaryReadComment;
