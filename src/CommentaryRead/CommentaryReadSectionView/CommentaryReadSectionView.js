import React from 'react';
import CommentaryReadComment from '../CommentaryReadComment/CommentaryReadComment';
import './CommentaryReadSectionView.css';

const CommentaryReadSectionView = (props) => {

    const { section } = props;

    return (
        <div className='CommentaryReadSectionView__container'>
            <section className='CommentaryReadSectionView__section'>
                <h3>{section.section_number}</h3>
                <p>{section.latin}</p>
            </section>
            <section className='CommentaryReadSectionView__section'>
                <h3>Commentary and Notes</h3>
                {section.comments.length !==0 && 
                    section.comments
                        .sort((a, b) => a.comment_order - b.comment_order)
                        .map((comment, i) => <CommentaryReadComment key={i} comment={comment} />)}
                {section.comments.length === 0 && <p>No notes yet for this section.</p>}
            </section>
        </div>
    );
}

export default CommentaryReadSectionView;