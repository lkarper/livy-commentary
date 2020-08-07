import React from 'react';
import CommentaryReadComment from '../CommentaryReadComment/CommentaryReadComment';

const CommentaryReadSectionView = (props) => {

    const { section } = props;

    return (
        <div>
            <section>
                <h3>Latin text:</h3>
                <p>{section.latin}</p>
            </section>
            <section>
                <h3>Commentary and Notes</h3>
                {section.comments.map((commentArray, i) => <CommentaryReadComment key={i} commentArray={commentArray} />)}
            </section>
        </div>
    );
}

export default CommentaryReadSectionView;