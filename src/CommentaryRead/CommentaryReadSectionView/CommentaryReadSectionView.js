import React from 'react';
import CommentaryReadComment from '../CommentaryReadComment/CommentaryReadComment';
import './CommentaryReadSectionView.css';

const CommentaryReadSectionView = (props) => {

    const { section, bookNumber, chapterNumber } = props;

    return (
        <div className='CommentaryReadSectionView__container'>
            <section className='CommentaryReadSectionView__section'>
                <h3>{bookNumber}.{chapterNumber}.{section.section_number}</h3>
                <p>{section.latin}</p>
            </section>
            <section className='CommentaryReadSectionView__section'>
                <h3>Commentary and Notes</h3>
                {section.comments.map((commentArray, i) => <CommentaryReadComment key={i} commentArray={commentArray} />)}
                {section.comments.length === 0 && <p>No notes yet for this section.</p>}
            </section>
        </div>
    );
}

export default CommentaryReadSectionView;