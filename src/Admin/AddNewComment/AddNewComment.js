import React, { useState } from 'react';
import CommentaryService from '../../services/commentary-service';
import './AddNewComment.css';

const AddNewComment = (props) => {

    const {
        section,
        suffix,
        comment_order,
        setShowEditComment,
        setCommentToEdit,
        setAddNewComment,
        addNewComment,
        updateComment,
        currentData
    } = props;

    const [tag, setTag] = useState(currentData ? currentData.tag : '');
    const [comment, setComment] = useState(currentData ? currentData.comment : '');

    const handleSubmit = (event) => {
        event.preventDefault();

        const newComment = {
            section,
            tag,
            comment,
            comment_order: comment_order || currentData.comment_order
        };

        if (suffix) {
            CommentaryService.updateComment(currentData.id, newComment)
                .then(() => {
                    const updatedCom = {
                        ...newComment,
                        id: currentData.id,
                    }
                    updateComment(updatedCom);
                    setCommentToEdit(null);
                    setShowEditComment(false);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            CommentaryService.addNewComment(newComment)
                .then(comment => {
                    addNewComment(comment);
                    setAddNewComment(false);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <form 
            className='AddNewComment_form'
            onSubmit={handleSubmit}
        >
            <div
                className='AddNewComment__input-div'
            >
                <label htmlFor='new-comment-tag'>Tag: </label>
                <input 
                    type='text'
                    id='new-comment-tag'
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
            <div
                className='AddNewComment__input-div'
            >
                <label htmlFor='new-comment'>Comment: </label>
                <textarea
                    className='AddNewComment__textarea'
                    id='new-comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <button
                type='submit'
                disabled={!tag || !comment}
            >
                Submit
            </button>
        </form>
    );
}

export default AddNewComment;