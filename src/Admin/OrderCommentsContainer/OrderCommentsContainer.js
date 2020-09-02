import React, { useState } from 'react';
import update from 'immutability-helper';
import DraggableComment from '../../DraggableComment/DraggableComment';
import CommentaryService from '../../services/commentary-service';

const OrderCommentsContainer = (props) => {

    const [comments, setComments] = useState(props.comments);

    const moveComment = (dragIndex, hoverIndex) => {
        const dragComment = comments[dragIndex];
        setComments(
            update(comments, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragComment]
                ],
            }),
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const promisesArray = comments.map((comment, i) => 
            CommentaryService.reorderComments(
                comment.id,
                {
                    section: comment.section,
                    tag: comment.tag,
                    comment: comment.comment,
                    comment_order: i + 1,        
                }
            ));

            Promise.all(promisesArray)
                .then(values => {
                    props.setShowOrderComments(false);
                    props.setSectionNumber(null);
                    props.forceUpdate(new Date().toJSON());
                })
                .catch(error => {
                    console.log(error);
                })
    }

    return (
        <form onSubmit={handleSubmit}>
            <button
                type='submit'
            >
                Submit new order
            </button>
            {comments.map((comment, i) => (
                <DraggableComment 
                    comment={comment}
                    key={comment.id}
                    index={i}
                    moveCard={moveComment}
                />
            ))}
        </form>
    );
}

export default OrderCommentsContainer;