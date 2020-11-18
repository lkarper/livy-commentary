import React from 'react';
import PropTypes from 'prop-types';
import CommentaryReadComment from '../CommentaryReadComment/CommentaryReadComment';
import './CommentaryReadSectionView.css';

const CommentaryReadSectionView = (props) => {

    const { section } = props;

    if (!section.section_number || !section.latin) {
        return (
            <div className="CommentaryReadSectionView__container">
                <h3>Error</h3>
                <p>Looks like something went wrong; check your connection and try again.</p>
            </div>
        );
    }

    return (
        <div className='CommentaryReadSectionView__container'>
            <section className='CommentaryReadSectionView__section'>
                <h3>{section.section_number}</h3>
                <p>{section.latin}</p>
            </section>
            <section className='CommentaryReadSectionView__section'>
                <h3>Commentary and Notes</h3>
                {section.comments.length !== 0 && 
                    section.comments
                        .sort((a, b) => a.comment_order - b.comment_order)
                        .map((comment, i) => <CommentaryReadComment key={i} comment={comment} />)}
                {section.comments.length === 0 && <p>No notes yet for this section.</p>}
            </section>
        </div>
    );
}

CommentaryReadSectionView.defaultProps = {
    section: {
        section_number: '',
        latin: '',
        comments: [],
    },
};

CommentaryReadSectionView.propTypes = {
    section: PropTypes.shape({
        section_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        latin: PropTypes.string,
        comments: PropTypes.arrayOf(PropTypes.object),
    }),
}


export default CommentaryReadSectionView;